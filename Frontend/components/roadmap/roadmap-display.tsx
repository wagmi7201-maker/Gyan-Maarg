'use client';

import { RoadmapResponse } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, BookOpen, Lightbulb } from 'lucide-react';

interface RoadmapDisplayProps {
  roadmap: RoadmapResponse;
}

export function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-background border-accent">
          <CardHeader>
            <CardTitle className="text-lg">Total Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">
              {roadmap.estimated_total_months}
            </p>
            <p className="text-sm text-muted-foreground">months</p>
          </CardContent>
        </Card>
        <Card className="bg-background border-accent">
          <CardHeader>
            <CardTitle className="text-lg">Phases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">{roadmap.roadmap_phases.length}</p>
            <p className="text-sm text-muted-foreground">structured phases</p>
          </CardContent>
        </Card>
        <Card className="bg-background border-accent">
          <CardHeader>
            <CardTitle className="text-lg">Target</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-accent truncate">{roadmap.target_career}</p>
            <p className="text-sm text-muted-foreground">career path</p>
          </CardContent>
        </Card>
      </div>

      {/* Phases Timeline */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Career Roadmap Phases</h3>
        {roadmap.roadmap_phases.map((phase, index) => (
          <Card key={index} className="bg-background border-l-4 border-l-accent">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    Phase {phase.phase_number}: {phase.title}
                  </CardTitle>
                  <CardDescription>{phase.duration_months} months</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2 text-foreground">{phase.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Skills */}
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-accent" />
                    Skills to Learn
                  </h4>
                  <ul className="space-y-1">
                    {phase.skills.map((skill, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Projects */}
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Projects to Build
                  </h4>
                  <ul className="space-y-1">
                    {phase.projects.map((project, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  Recommended Resources
                </h4>
                <ul className="space-y-1">
                  {phase.resources.map((resource, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {resource}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Milestones */}
              {phase.milestones.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Milestones</h4>
                  <ul className="space-y-1">
                    {phase.milestones.map((milestone, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        ✓ {milestone}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Success Tips */}
      {roadmap.success_tips.length > 0 && (
        <Card className="bg-accent/10 border-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              Success Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {roadmap.success_tips.map((tip, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-accent">→</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
