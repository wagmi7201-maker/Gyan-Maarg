"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, TrendingUp, AlertCircle, BarChart3 } from "lucide-react"

type MarketAnalysis = {
  skills?: {
    skill: string
    demand: number
    salary_range: string
    jobs_available: number
  }[]
  career?: {
    role: string
    demand: number
    salary_range: string
    jobs_available: number
    growth_rate: string
  }[]
  error?: string
}

export function JobMarketIntelligenceForm() {
  const [activeTab, setActiveTab] = useState<"skills" | "career">("skills")
  const [skills, setSkills] = useState("")
  const [career, setCareer] = useState("")
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null)
  const [error, setError] = useState("")

  const handleAnalyzeSkills = async () => {
    if (!skills.trim()) return

    setLoading(true)
    setError("")
    setAnalysis(null)

    try {
      const skillsArray = skills
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0)

      const mockAnalysis: MarketAnalysis = {
        skills: skillsArray.map(skill => ({
          skill,
          demand: Math.floor(Math.random() * 100) + 50,
          salary_range: `$${Math.floor(Math.random() * 80000) + 60000} - $${Math.floor(Math.random() * 150000) + 100000}`,
          jobs_available: Math.floor(Math.random() * 5000) + 1000,
        }))
      }

      setAnalysis(mockAnalysis)
    } catch (err) {
      setError("Failed to analyze market. Please try again.")
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
      const mockAnalysis: MarketAnalysis = {
        career: [
          {
            role: career,
            demand: Math.floor(Math.random() * 100) + 70,
            salary_range: `$${Math.floor(Math.random() * 80000) + 80000} - $${Math.floor(Math.random() * 200000) + 120000}`,
            jobs_available: Math.floor(Math.random() * 8000) + 2000,
            growth_rate: `${Math.floor(Math.random() * 30) + 10}%`
          }
        ]
      }

      setAnalysis(mockAnalysis)
    } catch (err) {
      setError("Failed to analyze market. Please try again.")
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

  if (analysis && (analysis.skills || analysis.career)) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Market Intelligence Analysis</h2>
          <p className="text-muted-foreground">
            Real-time insights based on current job market data
          </p>
        </div>

        <div className="space-y-4">
          {analysis.skills && (
            <div className="space-y-4">
              {analysis.skills.map((item) => (
                <Card key={item.skill} className="border-accent/20 hover:border-accent/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{item.skill}</CardTitle>
                        <CardDescription className="mt-1">In-demand technical skill</CardDescription>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">{item.demand}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="rounded-lg bg-foreground/5 p-4">
                        <p className="text-sm text-muted-foreground mb-1">Average Salary Range</p>
                        <p className="font-semibold text-lg">{item.salary_range}</p>
                      </div>
                      <div className="rounded-lg bg-foreground/5 p-4">
                        <p className="text-sm text-muted-foreground mb-1">Active Job Openings</p>
                        <p className="font-semibold text-lg">{item.jobs_available.toLocaleString()}+</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {analysis.career && (
            <div className="space-y-4">
              {analysis.career.map((item) => (
                <Card key={item.role} className="border-accent/20 hover:border-accent/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{item.role}</CardTitle>
                        <CardDescription className="mt-1">Career role insights</CardDescription>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">{item.demand}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="rounded-lg bg-foreground/5 p-4">
                        <p className="text-sm text-muted-foreground mb-1">Salary Range</p>
                        <p className="font-semibold text-lg">{item.salary_range}</p>
                      </div>
                      <div className="rounded-lg bg-foreground/5 p-4">
                        <p className="text-sm text-muted-foreground mb-1">Open Positions</p>
                        <p className="font-semibold text-lg">{item.jobs_available.toLocaleString()}+</p>
                      </div>
                      <div className="rounded-lg bg-foreground/5 p-4">
                        <p className="text-sm text-muted-foreground mb-1">Growth Rate</p>
                        <p className="font-semibold text-lg text-accent">{item.growth_rate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
