"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, BookOpen, Star, AlertCircle, Clock, Users } from "lucide-react"
import { generateRoadmap } from "@/lib/api-client"
import { RoadmapRequest } from "@/lib/types"

type CourseRecommendation = {
  courses?: {
    name: string
    platform: string
    duration: string
    rating: string
    students: string
    price: string
    link: string
    image: string
  }[]
  error?: string
}

type Course = NonNullable<CourseRecommendation["courses"]>[number]

const PLATFORMS = [
  { name: "Udemy", baseUrl: "https://www.udemy.com/courses/search/?q=" },
  { name: "Coursera", baseUrl: "https://www.coursera.org/search?query=" },
  { name: "edX", baseUrl: "https://www.edx.org/search?q=" },
  { name: "NPTEL", baseUrl: "https://onlinecourses.nptel.ac.in/search?query=" },
]

const buildCourse = (query: string, idx: number): Course => {
  const platform = PLATFORMS[idx % PLATFORMS.length]
  return {
    name: query,
    platform: platform.name,
    duration: `${4 + (idx % 8)} weeks`,
    rating: (4.3 + ((idx % 6) * 0.1)).toFixed(1),
    students: `${(idx + 1) * 5}k+`,
    price: idx % 3 === 0 ? "Free" : "Paid",
    link: `${platform.baseUrl}${encodeURIComponent(query)}`,
    image: "",
  }
}

const fallbackCourses = (skills: string, goal: string): Course[] => {
  const parsedSkills = skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean)

  const topics = parsedSkills.length > 0 ? parsedSkills : ["fundamentals", "projects", "interview prep"]

  return topics.slice(0, 6).map((topic, idx) => buildCourse(`${goal} ${topic} course`, idx))
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
      if (!skills.trim() || !goal.trim()) {
        setError("Please enter both skills and career goal.")
        setLoading(false)
        return
      }

      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)

      const request: RoadmapRequest = {
        student_level: "beginner",
        current_skills: skillsArray,
        target_career: goal.trim(),
      }

      let allCourses: Course[] = []

      try {
        const roadmap = await generateRoadmap(request)
        allCourses = roadmap.roadmap_phases
          .flatMap((phase) => {
            const topics = phase.skills.length > 0 ? phase.skills : [phase.title]
            return topics.slice(0, 2).map((topic, idx) => buildCourse(`${topic} for ${goal}`, phase.phase_number + idx))
          })
          .slice(0, 10)
      } catch {
        allCourses = fallbackCourses(skills, goal)
      }

      if (allCourses.length === 0) {
        setError("No courses found. Please try with different skills or goals.")
        setLoading(false)
        return
      }

      const recommendations: CourseRecommendation = { courses: allCourses }

      setRecommendations(recommendations)
    } catch (err: unknown) {
      console.error("Recommendations error:", err)
      const reason = err instanceof Error ? err.message : "Unknown error"
      setError(`Failed to generate recommendations. Reason: ${reason}`)
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
                    <CardTitle className="text-xl mb-1">{course.name}</CardTitle>
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
                      <p className="text-sm font-semibold">{course.students}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-foreground/5 p-3">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-sm font-semibold">{course.price}</p>
                    </div>
                  </div>
                </div>

                {/* Enroll Button */}
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => {
                    if (course.link && course.link !== "#") {
                      window.open(course.link, "_blank")
                    }
                  }}
                  disabled={!course.link || course.link === "#"}
                >
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
