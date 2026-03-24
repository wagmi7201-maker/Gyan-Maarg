"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, MapPin, Calendar, Settings } from "lucide-react"
import { studentProfile, careerRoadmap } from "@/lib/mock-data"

export function ProfileCard() {
  const completedMilestones = careerRoadmap.reduce(
    (acc, phase) => acc + phase.milestones.filter((m) => m.done).length,
    0
  )
  const totalMilestones = careerRoadmap.reduce(
    (acc, phase) => acc + phase.milestones.length,
    0
  )
  const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100)

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {studentProfile.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{studentProfile.name}</h2>
              <p className="text-sm text-muted-foreground">{studentProfile.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1">
            <GraduationCap className="h-3 w-3" />
            {studentProfile.degree}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Calendar className="h-3 w-3" />
            Class of {studentProfile.graduationYear}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {studentProfile.university}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Career Goal Progress</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {completedMilestones} of {totalMilestones} milestones completed
          </p>
        </div>

        <div className="rounded-lg bg-primary/5 p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Career Interest
          </p>
          <p className="mt-1 text-sm font-medium">{studentProfile.careerInterest}</p>
        </div>
      </CardContent>
    </Card>
  )
}
