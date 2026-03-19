"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Circle, Clock } from "lucide-react"
import { careerRoadmap } from "@/lib/mock-data"

export function CareerRoadmap() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Circle className="h-4 w-4 text-primary fill-primary" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20">
            In Progress
          </Badge>
        )
      default:
        return <Badge variant="outline">Upcoming</Badge>
    }
  }

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Your Career Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {careerRoadmap.map((phase, index) => (
            <div key={phase.id} className="relative pb-8 last:pb-0">
              {/* Connector line */}
              {index < careerRoadmap.length - 1 && (
                <div className="absolute left-[7px] top-8 h-full w-px bg-border" />
              )}

              <div className="flex gap-4">
                {/* Status indicator */}
                <div className="relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-background">
                  {getStatusIcon(phase.status)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{phase.phase}</h4>
                      <p className="text-xs text-muted-foreground">
                        Duration: {phase.duration}
                      </p>
                    </div>
                    {getStatusBadge(phase.status)}
                  </div>

                  <div className="rounded-lg border border-border/60 bg-secondary/30 p-3">
                    <ul className="space-y-2">
                      {phase.milestones.map((milestone, mIndex) => (
                        <li
                          key={mIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          {milestone.done ? (
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                          <span
                            className={
                              milestone.done
                                ? "text-muted-foreground line-through"
                                : ""
                            }
                          >
                            {milestone.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
