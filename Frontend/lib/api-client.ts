'use client';

import { RoadmapRequest, RoadmapResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

type FastApiRoadmapItem = {
  month?: number;
  title?: string;
  topics?: string[];
};

type FastApiRoadmapResponse = {
  role?: string;
  duration?: string;
  roadmap?: FastApiRoadmapItem[];
  error?: string;
};

const parseDurationMonths = (duration?: string, fallback?: number) => {
  if (!duration) return fallback ?? 0;
  const match = duration.match(/(\d+)(?:\s*-\s*(\d+))?/);
  if (!match) return fallback ?? 0;
  const start = Number(match[1]);
  const end = match[2] ? Number(match[2]) : start;
  if (Number.isNaN(start) || Number.isNaN(end)) return fallback ?? 0;
  return Math.round((start + end) / 2);
};

const normalizeFastApiResponse = (
  request: RoadmapRequest,
  data: FastApiRoadmapResponse
): RoadmapResponse => {
  const phases = (data.roadmap || []).map((item, idx) => ({
    phase_number: item.month ?? idx + 1,
    title: item.title || `Month ${idx + 1}`,
    description: `Focus areas for month ${item.month ?? idx + 1}`,
    duration_months: 1,
    skills: item.topics || [],
    projects: [],
    resources: [],
    milestones: [],
  }));

  return {
    student_level: request.student_level,
    current_skills: request.current_skills,
    target_career: data.role || request.target_career,
    roadmap_phases: phases,
    estimated_total_months: parseDurationMonths(data.duration, phases.length),
    success_tips: [
      "Stay consistent and review progress every week.",
      "Revise previous topics before starting a new month.",
      "Build small practical exercises from each topic.",
    ],
  };
};

const postJson = async (url: string, body: unknown) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  return { response, data };
};

export const generateRoadmap = async (data: RoadmapRequest): Promise<RoadmapResponse> => {
  try {
    // Primary backend contract (Django proxy endpoint)
    const legacyResult = await postJson(`${API_URL}/api/generate_roadmap`, data);
    if (legacyResult.response.ok) {
      return legacyResult.data as RoadmapResponse;
    }

    // Optional direct FastAPI fallback (if user runs standalone FastAPI backend)
    const fastApiPayload = {
      level: data.student_level,
      skills: data.current_skills.length ? data.current_skills.join(', ') : 'none',
      goal: data.target_career,
    };
    const fastApiResult = await postJson(`${API_URL}/generate`, fastApiPayload);
    if (fastApiResult.response.ok) {
      const fastApiData = fastApiResult.data as FastApiRoadmapResponse;
      if (fastApiData.error) throw new Error(fastApiData.error);
      return normalizeFastApiResponse(data, fastApiData);
    }

    if (!legacyResult.response.ok && !fastApiResult.response.ok) {
      const errorMessage =
        (legacyResult.data as { error?: string; detail?: string })?.error ||
        (legacyResult.data as { detail?: string })?.detail ||
        (fastApiResult.data as { error?: string; detail?: string })?.error ||
        (fastApiResult.data as { detail?: string })?.detail ||
        'Failed to generate roadmap';
      throw new Error(errorMessage);
    }

    if (!legacyResult.response.ok) {
      const message =
        (legacyResult.data as { error?: string; detail?: string })?.error ||
        (legacyResult.data as { detail?: string })?.detail ||
        legacyResult.response.statusText ||
        'Failed to generate roadmap';
      throw new Error(message);
    }
    return legacyResult.data as RoadmapResponse;
  } catch (error) {
    console.error('Roadmap generation failed:', error);
    throw error;
  }
};

export const streamRoadmap = async (
  data: RoadmapRequest,
  onChunk: (chunk: string) => void
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/stream_roadmap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      onChunk(chunk);
    }
  } catch (error) {
    console.error('Stream failed:', error);
    throw error;
  }
};
