"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"
import { cohortAnalytics } from "@/lib/mock-data"

const recruiterData = [
  { name: "Google", hires: 15, avgPackage: "28 LPA" },
  { name: "Microsoft", hires: 12, avgPackage: "24 LPA" },
  { name: "Amazon", hires: 18, avgPackage: "22 LPA" },
  { name: "Flipkart", hires: 10, avgPackage: "18 LPA" },
  { name: "Atlassian", hires: 8, avgPackage: "26 LPA" },
]

export function TopRecruiters() {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="h-5 w-5 text-primary" />
          Top Recruiters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recruiterData.map((recruiter, index) => (
            <div
              key={recruiter.name}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  {recruiter.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium">{recruiter.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {recruiter.hires} students hired
                  </p>
                </div>
              </div>
              <Badge variant="outline">{recruiter.avgPackage}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
