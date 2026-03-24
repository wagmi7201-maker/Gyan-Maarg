"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart as PieIcon } from "lucide-react"
import { cohortAnalytics } from "@/lib/mock-data"

export function SkillDistribution() {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <PieIcon className="h-5 w-5 text-primary" />
          Skill Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cohortAnalytics.skillDistribution.map((skill) => (
          <div key={skill.skill} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{skill.skill}</span>
              <span className="text-muted-foreground">{skill.percentage}%</span>
            </div>
            <Progress value={skill.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
