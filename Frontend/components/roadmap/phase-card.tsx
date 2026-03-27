'use client';

import { RoadmapPhase } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PhaseCardProps {
  phase: RoadmapPhase;
  isActive: boolean;
}

export function PhaseCard({ phase, isActive }: PhaseCardProps) {
  return (
    <Card className={`transition-all ${isActive ? 'border-accent border-2' : ''}`}>
      <CardHeader>
        <CardTitle className="text-lg">Phase {phase.phase_number}</CardTitle>
        <CardDescription>{phase.title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{phase.description}</p>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold">Duration:</span> {phase.duration_months} months
        </div>
      </CardContent>
    </Card>
  );
}
