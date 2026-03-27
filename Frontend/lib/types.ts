'use client';

export interface RoadmapPhase {
  phase_number: number;
  title: string;
  description: string;
  duration_months: number;
  skills: string[];
  projects: string[];
  resources: string[];
  milestones: string[];
}

export interface RoadmapResponse {
  student_level: string;
  current_skills: string[];
  target_career: string;
  roadmap_phases: RoadmapPhase[];
  estimated_total_months: number;
  success_tips: string[];
}

export interface RoadmapRequest {
  student_level: string;
  current_skills: string[];
  target_career: string;
}
