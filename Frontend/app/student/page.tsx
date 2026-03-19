import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProfileCard } from "@/components/student/profile-card"
import { SkillsOverview } from "@/components/student/skills-overview"
import { SkillGapAnalysis } from "@/components/student/skill-gap-analysis"
import { CareerRoadmap } from "@/components/student/career-roadmap"
import { LearningResources } from "@/components/student/learning-resources"
import { JobMarketWidget } from "@/components/student/job-market-widget"

export default function StudentDashboard() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Track your progress, identify skill gaps, and plan your career journey.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6">
              <ProfileCard />
              <SkillsOverview />
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <SkillGapAnalysis />
              <LearningResources />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <CareerRoadmap />
              <JobMarketWidget />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
