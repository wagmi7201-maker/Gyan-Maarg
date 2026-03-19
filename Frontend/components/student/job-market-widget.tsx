"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Briefcase } from "lucide-react"
import { jobMarketData } from "@/lib/mock-data"

export function JobMarketWidget() {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Briefcase className="h-5 w-5 text-primary" />
          Job Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {jobMarketData.map((job, index) => (
            <div
              key={job.role}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  #{index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{job.role}</h4>
                  <p className="text-xs text-muted-foreground">
                    {job.demand.toLocaleString()} openings
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{job.avgSalary}</p>
                <Badge
                  variant="outline"
                  className="mt-1 bg-green-500/10 text-green-500 border-green-500/20"
                >
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {job.growth}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
