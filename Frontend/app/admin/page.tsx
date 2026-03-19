import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CohortStats } from "@/components/admin/cohort-stats"
import { PlacementsChart } from "@/components/admin/placements-chart"
import { SkillDistribution } from "@/components/admin/skill-distribution"
import { IndustryDistribution } from "@/components/admin/industry-distribution"
import { TrendingSkills } from "@/components/admin/trending-skills"
import { TopRecruiters } from "@/components/admin/top-recruiters"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Monitor cohort analytics, placement statistics, and industry trends.
            </p>
          </div>

          <div className="space-y-6">
            {/* Stats Row */}
            <CohortStats />

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <PlacementsChart />
              <IndustryDistribution />
            </div>

            {/* Bottom Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <SkillDistribution />
              <TrendingSkills />
              <TopRecruiters />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
