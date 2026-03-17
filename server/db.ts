import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, studentProfiles, studentSkills, studentProjects, jobMarketData, careerPaths, skillGapAnalysis, learningResources, cohortAnalytics, studentProgress } from "../drizzle/schema";
import { ENV } from './_core/env';
import type { StudentProfile, StudentSkill, StudentProject, JobMarketData, CareerPath, SkillGapAnalysis, LearningResource, CohortAnalytics, StudentProgress } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Student Profile Queries
export async function getStudentProfile(studentId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(studentProfiles).where(eq(studentProfiles.id, studentId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getStudentSkills(studentId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(studentSkills).where(eq(studentSkills.studentId, studentId));
}

export async function getStudentProjects(studentId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(studentProjects).where(eq(studentProjects.studentId, studentId));
}

// Job Market Data Queries
export async function getJobsBySkill(skill: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(jobMarketData).where(eq(jobMarketData.jobTitle, skill)).limit(50);
}

export async function getTopInDemandSkills(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(jobMarketData).limit(limit);
}

// Career Path Queries
export async function getStudentCareerPath(studentId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(careerPaths).where(eq(careerPaths.studentId, studentId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Skill Gap Analysis Queries
export async function getStudentSkillGaps(studentId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(skillGapAnalysis).where(eq(skillGapAnalysis.studentId, studentId));
}

// Learning Resources Queries
export async function getRecommendedResources(skills: string[]) {
  const db = await getDb();
  if (!db) return [];
  // Simple query - in production, use more sophisticated matching
  return await db.select().from(learningResources).limit(20);
}

// Cohort Analytics Queries
export async function getCohortAnalytics(cohortName: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(cohortAnalytics).where(eq(cohortAnalytics.cohortName, cohortName)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Student Progress Queries
export async function getStudentProgress(studentId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(studentProgress).where(eq(studentProgress.studentId, studentId));
}
