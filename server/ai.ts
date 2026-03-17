import { invokeLLM } from "./_core/llm";
import type { StudentSkill, JobMarketData } from "../drizzle/schema";

/**
 * Analyzes skill gaps between a student's current skills and job requirements
 */
export async function analyzeSkillGaps(
  studentSkills: StudentSkill[],
  targetJobData: JobMarketData[]
) {
  if (targetJobData.length === 0) {
    return [];
  }

  const studentSkillNames = studentSkills.map(s => s.skillName);
  const jobRequiredSkills = targetJobData.flatMap(j => j.requiredSkills);
  const jobPreferredSkills = targetJobData.flatMap(j => j.preferredSkills || []);

  const prompt = `
You are a career guidance expert. Analyze the skill gaps between a student's current skills and job market requirements.

Student's Current Skills: ${studentSkillNames.join(", ")}

Required Skills in Target Jobs: ${jobRequiredSkills.join(", ")}

Preferred Skills in Target Jobs: ${jobPreferredSkills.join(", ")}

For each skill gap, provide:
1. Skill name
2. Current level (if student has it)
3. Required level
4. Gap severity (critical, high, medium, low)
5. Priority (1-10, where 10 is highest)
6. Recommended action

Return as JSON array with objects containing: skillName, currentLevel, requiredLevel, gapSeverity, priority, recommendedAction
`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are a career guidance expert specializing in skill development and job market analysis. Provide structured, actionable insights.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "skill_gaps",
        strict: true,
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              skillName: { type: "string" },
              currentLevel: { type: "string", enum: ["beginner", "intermediate", "advanced", "expert", "none"] },
              requiredLevel: { type: "string", enum: ["beginner", "intermediate", "advanced", "expert"] },
              gapSeverity: { type: "string", enum: ["critical", "high", "medium", "low"] },
              priority: { type: "integer", minimum: 1, maximum: 10 },
              recommendedAction: { type: "string" },
            },
            required: ["skillName", "currentLevel", "requiredLevel", "gapSeverity", "priority", "recommendedAction"],
            additionalProperties: false,
          },
        },
      },
    },
  });

  try {
    const content = response.choices[0]?.message.content;
    if (!content || typeof content !== 'string') return [];
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    console.error("Failed to parse skill gaps response");
    return [];
  }
}

/**
 * Generates a personalized career roadmap for a student
 */
export async function generateCareerRoadmap(
  studentProfile: {
    name: string;
    degree: string;
    major: string;
    skills: string[];
    interests: string[];
  },
  targetRole: string,
  skillGaps: Array<{
    skillName: string;
    gapSeverity: string;
    priority: number;
  }>
) {
  const prompt = `
You are a career development strategist. Create a detailed personalized career roadmap for a student.

Student Profile:
- Name: ${studentProfile.name}
- Education: ${studentProfile.degree} in ${studentProfile.major}
- Current Skills: ${studentProfile.skills.join(", ")}
- Career Interests: ${studentProfile.interests.join(", ")}

Target Role: ${targetRole}

Skill Gaps to Address:
${skillGaps.map(g => `- ${g.skillName} (Priority: ${g.priority}/10, Severity: ${g.gapSeverity})`).join("\n")}

Create a roadmap that includes:
1. Current Level Assessment
2. Target Level Description
3. Recommended Learning Path (3-5 courses/projects)
4. Estimated Timeline (in months)
5. Key Milestones
6. Success Metrics

Return as JSON with: currentLevel, targetLevel, learningPath (array of course names), estimatedMonths, milestones (array), successMetrics (array)
`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are an expert career strategist who creates practical, achievable career development plans based on individual profiles and market demands.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "career_roadmap",
        strict: true,
        schema: {
          type: "object",
          properties: {
            currentLevel: { type: "string" },
            targetLevel: { type: "string" },
            learningPath: {
              type: "array",
              items: { type: "string" },
            },
            estimatedMonths: { type: "integer" },
            milestones: {
              type: "array",
              items: { type: "string" },
            },
            successMetrics: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["currentLevel", "targetLevel", "learningPath", "estimatedMonths", "milestones", "successMetrics"],
          additionalProperties: false,
        },
      },
    },
  });

  try {
    const content = response.choices[0]?.message.content;
    if (!content || typeof content !== 'string') return null;
    return JSON.parse(content);
  } catch {
    console.error("Failed to parse career roadmap response");
    return null;
  }
}

/**
 * Recommends learning resources based on skill gaps
 */
export async function recommendLearningResources(
  skillGaps: string[],
  preferredFormat: "course" | "project" | "certification" = "course"
) {
  const prompt = `
You are an educational resource curator. Recommend the best learning resources for developing specific skills.

Skills to Learn: ${skillGaps.join(", ")}
Preferred Format: ${preferredFormat}

For each skill, recommend 2-3 resources that are:
- High quality and well-reviewed
- Accessible and affordable
- Practical and hands-on
- From reputable platforms (Coursera, edX, Udemy, GitHub, etc.)

Return as JSON array with objects containing: skill, resourceName, platform, duration, difficulty, link, description
`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are an expert in educational technology and career development. Recommend high-quality, practical learning resources that help students develop in-demand skills.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "learning_resources",
        strict: true,
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              skill: { type: "string" },
              resourceName: { type: "string" },
              platform: { type: "string" },
              duration: { type: "string" },
              difficulty: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
              link: { type: "string" },
              description: { type: "string" },
            },
            required: ["skill", "resourceName", "platform", "duration", "difficulty", "link", "description"],
            additionalProperties: false,
          },
        },
      },
    },
  });

  try {
    const content = response.choices[0]?.message.content;
    if (!content || typeof content !== 'string') return [];
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    console.error("Failed to parse learning resources response");
    return [];
  }
}

/**
 * Analyzes industry trends and emerging skills
 */
export async function analyzeIndustryTrends(industry: string) {
  const prompt = `
You are an industry analyst specializing in job market trends and skill demand.

Analyze the current and emerging trends in the ${industry} industry.

Provide insights on:
1. Top 5 in-demand skills (with demand trend: increasing/stable/decreasing)
2. Emerging roles (new job titles gaining popularity)
3. Salary trends (average compensation ranges)
4. Geographic hotspots (where most opportunities are)
5. Future outlook (next 2-3 years)

Return as JSON with: topSkills (array of {skill, demandTrend}), emergingRoles (array), salaryTrends (object), geographicHotspots (array), futureOutlook (string)
`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are an industry analyst with deep knowledge of job market trends, skill demand, and career opportunities across sectors.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "industry_trends",
        strict: true,
        schema: {
          type: "object",
          properties: {
            topSkills: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  skill: { type: "string" },
                  demandTrend: { type: "string", enum: ["increasing", "stable", "decreasing"] },
                },
              },
            },
            emergingRoles: {
              type: "array",
              items: { type: "string" },
            },
            salaryTrends: {
              type: "object",
              additionalProperties: { type: "string" },
            },
            geographicHotspots: {
              type: "array",
              items: { type: "string" },
            },
            futureOutlook: { type: "string" },
          },
          required: ["topSkills", "emergingRoles", "salaryTrends", "geographicHotspots", "futureOutlook"],
          additionalProperties: false,
        },
      },
    },
  });

  try {
    const content = response.choices[0]?.message.content;
    if (!content || typeof content !== 'string') return null;
    return JSON.parse(content);
  } catch {
    console.error("Failed to parse industry trends response");
    return null;
  }
}

/**
 * Generates personalized career advice based on student profile
 */
export async function generateCareerAdvice(
  studentProfile: {
    skills: string[];
    interests: string[];
    experience: string;
    education: string;
  },
  targetRole: string
) {
  const prompt = `
You are a career coach providing personalized guidance to a student.

Student Profile:
- Skills: ${studentProfile.skills.join(", ")}
- Interests: ${studentProfile.interests.join(", ")}
- Experience: ${studentProfile.experience}
- Education: ${studentProfile.education}

Target Role: ${targetRole}

Provide personalized career advice including:
1. Realistic assessment of current readiness (0-100%)
2. Key strengths to leverage
3. Critical gaps to address
4. Recommended next steps (3-5 actionable items)
5. Timeline to target role
6. Alternative career paths to consider

Return as JSON with: readinessScore, strengths (array), gaps (array), nextSteps (array), timeline, alternativePaths (array)
`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are an experienced career coach who provides honest, actionable, and motivating career guidance tailored to individual profiles.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "career_advice",
        strict: true,
        schema: {
          type: "object",
          properties: {
            readinessScore: { type: "integer", minimum: 0, maximum: 100 },
            strengths: {
              type: "array",
              items: { type: "string" },
            },
            gaps: {
              type: "array",
              items: { type: "string" },
            },
            nextSteps: {
              type: "array",
              items: { type: "string" },
            },
            timeline: { type: "string" },
            alternativePaths: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["readinessScore", "strengths", "gaps", "nextSteps", "timeline", "alternativePaths"],
          additionalProperties: false,
        },
      },
    },
  });

  try {
    const content = response.choices[0]?.message.content;
    if (!content || typeof content !== 'string') return null;
    return JSON.parse(content);
  } catch {
    console.error("Failed to parse career advice response");
    return null;
  }
}
