"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, TrendingUp, AlertCircle, BarChart3, Building2, MapPin, Briefcase } from "lucide-react"

type MarketAnalysis = {
  jobs?: {
    title: string
    company: string
    location: string
    salary: string
    description: string
    skills: string[]
    experience: string
    logo: string
    link: string
  }[]
  aiRecommendation?: string
  error?: string
}

export function JobMarketIntelligenceForm() {
  const [activeTab, setActiveTab] = useState<"skills" | "career">("skills")
  const [skills, setSkills] = useState("")
  const [career, setCareer] = useState("")
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null)
  const [error, setError] = useState("")

  const fetchMarketAnalysis = async (inputSkills: string, inputGoal: string) => {
    const response = await fetch("/api/job-market", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skills: inputSkills,
        goal: inputGoal,
      }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data?.error || "Failed to analyze market")
    }

    return data as MarketAnalysis
  }

  const handleAnalyzeSkills = async () => {
    if (!skills.trim()) return

    setLoading(true)
    setError("")
    setAnalysis(null)

    try {
      const result = await fetchMarketAnalysis(skills.trim(), career.trim() || "Software Developer")
      setAnalysis(result)
    } catch (err) {
      const reason = err instanceof Error ? err.message : "Unknown error"
      setError(`Failed to analyze market. ${reason}`)
      console.error("Skills analysis error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyzeCareer = async () => {
    if (!career.trim()) return

    setLoading(true)
    setError("")
    setAnalysis(null)

    try {
      const result = await fetchMarketAnalysis(career.trim(), career.trim())
      setAnalysis(result)
    } catch (err) {
      const reason = err instanceof Error ? err.message : "Unknown error"
      setError(`Failed to analyze market. ${reason}`)
      console.error("Career analysis error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setAnalysis(null)
    setSkills("")
    setCareer("")
    setError("")
  }

  if (analysis && analysis.jobs) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Market Intelligence Analysis</h2>
          <p className="text-muted-foreground">
            Real-time insights based on current job market data
          </p>
        </div>

        {analysis.aiRecommendation && (
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="text-xl">AI Career Analysis</CardTitle>
              <CardDescription>Generated from your skills, goal, and live jobs data</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-6">
                {analysis.aiRecommendation}
              </pre>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {analysis.jobs.map((job, index) => (
            <Card key={`${job.title}-${job.company}-${index}`} className="border-accent/20 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {job.company}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold text-accent">{job.salary}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="rounded-lg bg-foreground/5 p-3">
                    <p className="text-xs text-muted-foreground mb-1">Location</p>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </p>
                  </div>
                  <div className="rounded-lg bg-foreground/5 p-3">
                    <p className="text-xs text-muted-foreground mb-1">Experience</p>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {job.experience}
                    </p>
                  </div>
                  <div className="rounded-lg bg-foreground/5 p-3">
                    <p className="text-xs text-muted-foreground mb-1">Skills</p>
                    <p className="text-sm font-semibold">{job.skills.length ? job.skills.join(", ") : "Software"}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{job.description}</p>
                <Button
                  className="w-full"
                  onClick={() => {
                    if (job.link) window.open(job.link, "_blank")
                  }}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Analyze Market Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle>
            {activeTab === "skills" ? "Analyze Market for Your Skills" : "Analyze Market for Career Goals"}
          </CardTitle>
          <CardDescription>
            {activeTab === "skills"
              ? "Enter your skills to see market demand, salary trends, and job opportunities"
              : "Enter a career goal to see market demand, growth potential, and salary information"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activeTab === "skills" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Current Skills</label>
                  <Input
                    placeholder="e.g., Python, React, Data Science (comma-separated)"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button
                  onClick={handleAnalyzeSkills}
                  disabled={!skills.trim() || loading}
                  className="w-full h-11 gap-2 text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing Market...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4" />
                      Analyze Market
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Career Goal</label>
                  <Input
                    placeholder="e.g., Data Scientist, Full Stack Developer, Product Manager"
                    value={career}
                    onChange={(e) => setCareer(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button
                  onClick={handleAnalyzeCareer}
                  disabled={!career.trim() || loading}
                  className="w-full h-11 gap-2 text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing Market...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4" />
                      Analyze Market
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 border-b border-border">
        <Button
          variant={activeTab === "skills" ? "default" : "ghost"}
          onClick={() => {
            setActiveTab("skills")
            setAnalysis(null)
            setError("")
          }}
          className="rounded-none border-b-2"
        >
          Enter Skills
        </Button>
        <Button
          variant={activeTab === "career" ? "default" : "ghost"}
          onClick={() => {
            setActiveTab("career")
            setAnalysis(null)
            setError("")
          }}
          className="rounded-none border-b-2"
        >
          Career Goals
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-base">Real-time Data</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Updated with current job market trends and salary data
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-base">Salary Insights</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Detailed salary ranges based on skills and experience levels
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-base">Job Availability</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Track active job openings and market demand for your skills
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
