"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Trophy, TrendingUp, Building2 } from "lucide-react"
import { cohortAnalytics } from "@/lib/mock-data"

const stats = [
  {
    title: "Total Students",
    value: cohortAnalytics.totalStudents,
    icon: Users,
    description: "Active in current cohort",
  },
  {
    title: "Placed Students",
    value: cohortAnalytics.placedStudents,
    icon: Trophy,
    description: `${Math.round((cohortAnalytics.placedStudents / cohortAnalytics.totalStudents) * 100)}% placement rate`,
  },
  {
    title: "Average Package",
    value: cohortAnalytics.averagePackage,
    icon: TrendingUp,
    description: `Highest: ${cohortAnalytics.highestPackage}`,
  },
  {
    title: "Top Recruiters",
    value: cohortAnalytics.topRecruiters.length,
    icon: Building2,
    description: "Partner companies",
  },
]

export function CohortStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
