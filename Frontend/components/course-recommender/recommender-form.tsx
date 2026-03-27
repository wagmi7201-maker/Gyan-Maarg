"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, BookOpen, Star, AlertCircle, Clock, Users } from "lucide-react"

type CourseRecommendation = {
  courses?: {
    title: string
    platform: string
    duration: string
    rating: number
    students: number
    difficulty: string
    url: string
  }[]
  error?: string
}

export function CourseRecommenderForm() {
  const [skills, setSkills] = useState("")
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<CourseRecommendation | null>(null)
  const [error, setError] = useState("")

  const handleGenerateRecommendations = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setRecommendations(null)

    try {
      const skillsArray = skills
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0)

      // Mock data - replace with actual API call
      const mockRecommendations: CourseRecommendation = {
        courses: [
          {
            title: `Complete ${goal} Masterclass`,
            platform: "Udemy",
            duration: "40 hours",
            rating: 4.8,
            students: 125000,
            difficulty: "Intermediate",
            url: "#"
          },
          {
            title: `${goal} Fundamentals & Advanced Concepts`,
            platform: "Coursera",
            duration: "3 months",
            rating: 4.7,
            students: 85000,
            difficulty: "Beginner to Advanced",
            url: "#"
          },
          {
            title: `Build Real Projects as ${goal}`,
            platform: "LinkedIn Learning",
            duration: "25 hours",
            rating: 4.6,
            students: 42000,
            difficulty: "Intermediate",
            url: "#"
          },
          {
            title: `${goal} in-depth Analysis Course`,
            platform: "Pluralsight",
            duration: "35 hours",
            rating: 4.9,
            students: 95000,
            difficulty: "Advanced",
            url: "#"
          },
        ]
      }

      setRecommendations(mockRecommendations)
    } catch (err) {
      setError("Failed to generate recommendations. Please try again.")
      console.error("Recommendations error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setRecommendations(null)
    setSkills("")
    setGoal("")
    setError("")
  }

  if (recommendations && recommendations.courses) {
    return (
      <div className="space-y-6">
        {/* Results Header */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Recommended Courses</h2>
          <p className="text-muted-foreground">
            Personalized courses to help you become a <span className="font-semibold text-accent">{goal}</span>
          </p>
        </div>

        {/* Course Cards */}
        <div className="space-y-4">
          {recommendations.courses.map((course, idx) => (
            <Card key={idx} className="border-accent/20 hover:border-accent/50 transition-colors overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{course.title}</CardTitle>
                    <CardDescription className="text-sm">{course.platform}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 ml-4">
                    <Star className="h-4 w-4 text-accent fill-accent" />
                    <span className="text-sm font-semibold text-accent">{course.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Course Stats */}
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-foreground/5 p-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-semibold">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-foreground/5 p-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Students</p>
                      <p className="text-sm font-semibold">{(course.students / 1000).toFixed(0)}K+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-foreground/5 p-3">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Level</p>
                      <p className="text-sm font-semibold">{course.difficulty}</p>
                    </div>
                  </div>
                </div>

                {/* Enroll Button */}
                <Button variant="outline" className="w-full">
                  View Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Get Different Recommendations
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
          <CardTitle>Get Course Recommendations</CardTitle>
          <CardDescription>
            Tell us your skills and career goals to get personalized course recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateRecommendations} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Current Skills</label>
              <Input
                placeholder="e.g., Python, JavaScript, SQL (comma-separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Career Goal</label>
              <Input
                placeholder="e.g., Data Scientist, Full Stack Developer, Product Manager"
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
                  Finding Courses...
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4" />
                  Generate Recommendations
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
            <CardTitle className="text-base">Curated Courses</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Handpicked from top platforms like Udemy, Coursera, and LinkedIn Learning
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-base">Skill Matched</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Courses tailored to your current skills and learning pace
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-base">Top Rated</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Only highly-rated courses with thousands of successful learners
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
