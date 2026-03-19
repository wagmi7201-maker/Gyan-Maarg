"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { studentSkills } from "@/lib/mock-data"

export function SkillsOverview() {
  const getSkillColor = (proficiency: number) => {
    if (proficiency >= 80) return "text-green-500"
    if (proficiency >= 60) return "text-primary"
    if (proficiency >= 40) return "text-yellow-500"
    return "text-red-500"
  }

  const categories = [...new Set(studentSkills.map((s) => s.category))]

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-lg">Your Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        <div className="space-y-4">
          {studentSkills.map((skill) => (
            <div key={skill.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({skill.source})
                  </span>
                </div>
                <span className={`font-medium ${getSkillColor(skill.proficiency)}`}>
                  {skill.proficiency}%
                </span>
              </div>
              <Progress value={skill.proficiency} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
