"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Flame } from "lucide-react"
import { trendingSkills } from "@/lib/mock-data"

export function TrendingSkills() {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-primary" />
          Trending Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {trendingSkills.map((skill, index) => (
          <div
            key={skill.skill}
            className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                #{index + 1}
              </div>
              <div>
                <h4 className="font-medium text-sm">{skill.skill}</h4>
                <p className="text-xs text-muted-foreground">
                  {skill.demand.toLocaleString()} job postings
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-500 border-green-500/20"
            >
              <TrendingUp className="mr-1 h-3 w-3" />
              {skill.trend}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
