'use client';

import { RoadmapResponse } from '@/lib/types';
import { ArrowRight, Target } from 'lucide-react';

interface TimelineViewProps {
  roadmap: RoadmapResponse;
}

export function TimelineView({ roadmap }: TimelineViewProps) {
  let cumulativeMonths = 0;

  return (
    <div className="relative">
      {/* Timeline container */}
      <div className="space-y-8">
        {roadmap.roadmap_phases.map((phase, index) => {
          const startMonth = cumulativeMonths;
          cumulativeMonths += phase.duration_months;

          return (
            <div key={index} className="flex gap-4 relative">
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-background font-bold text-lg">
                  {phase.phase_number}
                </div>
                {index < roadmap.roadmap_phases.length - 1 && (
                  <div className="w-1 h-20 bg-accent/30 mt-2"></div>
                )}
              </div>

              {/* Timeline content */}
              <div className="flex-1 pt-2">
                <h3 className="text-lg font-bold mb-1">{phase.title}</h3>
                <p className="text-sm text-accent mb-2">
                  Month {startMonth + 1} - {cumulativeMonths}
                </p>
                <p className="text-sm text-muted-foreground mb-3">{phase.description}</p>

                {/* Quick skills preview */}
                <div className="flex flex-wrap gap-2">
                  {phase.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                  {phase.skills.length > 3 && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                      +{phase.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* End marker */}
      <div className="flex gap-4 mt-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
            ✓
          </div>
        </div>
        <div className="pt-2">
          <h3 className="text-lg font-bold mb-1">Ready for Career!</h3>
          <p className="text-sm text-muted-foreground">
            Total journey: {roadmap.estimated_total_months} months
          </p>
        </div>
      </div>
    </div>
  );
}
