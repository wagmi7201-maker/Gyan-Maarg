"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ExternalLink, Clock } from "lucide-react"
import { learningResources } from "@/lib/mock-data"

export function LearningResources() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Course":
        return "bg-primary/10 text-primary border-primary/20"
      case "Certification":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Tutorial":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return ""
    }
  }

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5 text-primary" />
          Recommended Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {learningResources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 p-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm truncate">{resource.title}</h4>
                <Badge variant="outline" className={`shrink-0 ${getTypeColor(resource.type)}`}>
                  {resource.type}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{resource.provider}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {resource.duration}
                </span>
                <span className="text-primary font-medium">
                  {resource.relevance}% match
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0 ml-2">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
