"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, ArrowRight } from "lucide-react"
import { skillGaps } from "@/lib/mock-data"

export function SkillGapAnalysis() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return ""
    }
  }

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Skill Gap Analysis
          </CardTitle>
          <Badge variant="outline">{skillGaps.length} gaps identified</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {skillGaps.map((gap) => (
          <div
            key={gap.id}
            className="rounded-lg border border-border/60 bg-secondary/30 p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium">{gap.skill}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {gap.recommendations[0]}
                </p>
              </div>
              <Badge variant="outline" className={getPriorityColor(gap.priority)}>
                {gap.priority}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Current Level</span>
                <span className="text-muted-foreground">Required Level</span>
              </div>
              <div className="relative h-2 rounded-full bg-muted">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-red-500/50"
                  style={{ width: `${gap.currentLevel}%` }}
                />
                <div
                  className="absolute top-0 h-full border-r-2 border-primary"
                  style={{ left: `${gap.requiredLevel}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span>{gap.currentLevel}%</span>
                <span className="text-primary">{gap.requiredLevel}%</span>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="mt-3 w-full gap-2">
              View Learning Resources
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
