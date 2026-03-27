"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles, AlertCircle } from "lucide-react"
import { generateRoadmap } from "@/lib/api-client"
import { RoadmapResponse, RoadmapRequest } from "@/lib/types"
import { RoadmapDisplay } from "./roadmap-display"
import { TimelineView } from "./timeline-view"

export function RoadmapForm() {
  const [level, setLevel] = useState("beginner")
  const [skills, setSkills] = useState("")
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null)
  const [error, setError] = useState("")
  const [viewMode, setViewMode] = useState<"detailed" | "timeline">("detailed")

  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setRoadmap(null)

    try {
      const skillsArray = skills
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0)

      const request: RoadmapRequest = {
        student_level: level,
        current_skills: skillsArray.length > 0 ? skillsArray : [],
        target_career: goal,
      }

      const result = await generateRoadmap(request)
      setRoadmap(result)
    } catch (err) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
      const reason = err instanceof Error ? err.message : "Unknown error"
      setError(
        `Failed to generate roadmap from ${apiUrl}. Reason: ${reason}`
      )
      console.error("Roadmap generation error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setRoadmap(null)
    setGoal("")
    setSkills("")
    setError("")
  }

  const downloadRoadmap = () => {
    if (!roadmap) return
    const dataStr = JSON.stringify(roadmap, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `gyan-maarg-roadmap-${roadmap.target_career.replace(/\s+/g, "-")}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (roadmap) {
    return (
      <div className="space-y-6">
        {/* Header with Generated Info */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Your Career Roadmap</h2>
          <p className="text-muted-foreground">
            Personalized path to become a <span className="font-semibold text-accent">{roadmap.target_career}</span>
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex gap-2 border-b border-border">
          <Button
            variant={viewMode === "detailed" ? "default" : "ghost"}
            onClick={() => setViewMode("detailed")}
            className="border-b-2 rounded-none"
          >
            Detailed View
          </Button>
          <Button
            variant={viewMode === "timeline" ? "default" : "ghost"}
            onClick={() => setViewMode("timeline")}
            className="border-b-2 rounded-none"
          >
            Timeline View
          </Button>
        </div>

        {/* Roadmap Content */}
        {viewMode === "detailed" ? (
          <RoadmapDisplay roadmap={roadmap} />
        ) : (
          <TimelineView roadmap={roadmap} />
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button onClick={downloadRoadmap} variant="default" className="flex-1">
            Download Roadmap
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Create New Roadmap
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle>Generate Your Career Roadmap</CardTitle>
          <CardDescription>
            Provide your details and let AI create a personalized learning path for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateRoadmap} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Level Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Skills Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Skills</label>
                <Input
                  placeholder="e.g., Python, JavaScript, React (comma-separated)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
            </div>

            {/* Goal Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Career Goal</label>
              <Input
                placeholder="e.g., Data Scientist, Full Stack Developer, Machine Learning Engineer"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!goal.trim() || loading}
              className="w-full h-11 gap-2 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Your AI Roadmap...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Roadmap with AI
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-base">AI-Powered</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Leverages advanced AI to create personalized learning paths
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-base">Real-time Market Data</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Updated with current job market trends and requirements
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-base">Structured Phases</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Clear milestones and resources for each phase of learning
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
