import { decimal, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, index } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "placement_cell"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Student Profile Table
export const studentProfiles = mysqlTable("student_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  institutionName: varchar("institution_name", { length: 255 }),
  degree: varchar("degree", { length: 100 }),
  major: varchar("major", { length: 100 }),
  graduationYear: int("graduation_year"),
  gpa: decimal("gpa", { precision: 3, scale: 2 }),
  careerInterests: json("career_interests").$type<string[]>(),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("idx_user_id").on(table.userId)]);

export type StudentProfile = typeof studentProfiles.$inferSelect;
export type InsertStudentProfile = typeof studentProfiles.$inferInsert;

// Student Skills Table
export const studentSkills = mysqlTable("student_skills", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id").notNull(),
  skillName: varchar("skill_name", { length: 100 }).notNull(),
  proficiencyLevel: mysqlEnum("proficiency_level", ["beginner", "intermediate", "advanced", "expert"]).notNull(),
  yearsOfExperience: decimal("years_of_experience", { precision: 3, scale: 1 }),
  source: mysqlEnum("source", ["academic", "project", "internship", "self_taught", "certification"]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [index("idx_student_id").on(table.studentId)]);

export type StudentSkill = typeof studentSkills.$inferSelect;
export type InsertStudentSkill = typeof studentSkills.$inferInsert;

// Student Projects Table
export const studentProjects = mysqlTable("student_projects", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id").notNull(),
  projectName: varchar("project_name", { length: 255 }).notNull(),
  description: text("description"),
  technologies: json("technologies").$type<string[]>(),
  duration: varchar("duration", { length: 100 }),
  link: varchar("link", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [index("idx_student_id").on(table.studentId)]);

export type StudentProject = typeof studentProjects.$inferSelect;
export type InsertStudentProject = typeof studentProjects.$inferInsert;

// Job Market Data Table
export const jobMarketData = mysqlTable("job_market_data", {
  id: int("id").autoincrement().primaryKey(),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  requiredSkills: json("required_skills").$type<string[]>().notNull(),
  preferredSkills: json("preferred_skills").$type<string[]>(),
  experience: varchar("experience", { length: 100 }),
  salary: varchar("salary", { length: 100 }),
  industry: varchar("industry", { length: 100 }),
  company: varchar("company", { length: 255 }),
  location: varchar("location", { length: 255 }),
  jobCount: int("job_count").default(0),
  demandTrend: mysqlEnum("demand_trend", ["increasing", "stable", "decreasing"]),
  source: varchar("source", { length: 100 }),
  lastUpdated: timestamp("last_updated").defaultNow().onUpdateNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [index("idx_job_title").on(table.jobTitle)]);

export type JobMarketData = typeof jobMarketData.$inferSelect;
export type InsertJobMarketData = typeof jobMarketData.$inferInsert;

// Career Paths Table
export const careerPaths = mysqlTable("career_paths", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id").notNull(),
  targetRole: varchar("target_role", { length: 255 }).notNull(),
  currentLevel: varchar("current_level", { length: 100 }),
  targetLevel: varchar("target_level", { length: 100 }),
  skillGaps: json("skill_gaps").$type<Array<{skill: string; gap: string}>>(),
  recommendedCourses: json("recommended_courses").$type<string[]>(),
  recommendedProjects: json("recommended_projects").$type<string[]>(),
  estimatedTimeMonths: int("estimated_time_months"),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("idx_student_id").on(table.studentId)]);

export type CareerPath = typeof careerPaths.$inferSelect;
export type InsertCareerPath = typeof careerPaths.$inferInsert;

// Learning Resources Table
export const learningResources = mysqlTable("learning_resources", {
  id: int("id").autoincrement().primaryKey(),
  resourceName: varchar("resource_name", { length: 255 }).notNull(),
  resourceType: mysqlEnum("resource_type", ["course", "project", "certification", "article", "video"]).notNull(),
  skills: json("skills").$type<string[]>(),
  platform: varchar("platform", { length: 100 }),
  duration: varchar("duration", { length: 100 }),
  difficulty: mysqlEnum("difficulty", ["beginner", "intermediate", "advanced"]),
  link: varchar("link", { length: 500 }),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [index("idx_resource_type").on(table.resourceType)]);

export type LearningResource = typeof learningResources.$inferSelect;
export type InsertLearningResource = typeof learningResources.$inferInsert;

// Skill Gap Analysis Table
export const skillGapAnalysis = mysqlTable("skill_gap_analysis", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id").notNull(),
  targetJobId: int("target_job_id"),
  skillName: varchar("skill_name", { length: 100 }).notNull(),
  studentLevel: varchar("student_level", { length: 50 }),
  requiredLevel: varchar("required_level", { length: 50 }),
  gapSeverity: mysqlEnum("gap_severity", ["critical", "high", "medium", "low"]),
  priority: int("priority"),
  recommendedAction: text("recommended_action"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [index("idx_student_id").on(table.studentId)]);

export type SkillGapAnalysis = typeof skillGapAnalysis.$inferSelect;
export type InsertSkillGapAnalysis = typeof skillGapAnalysis.$inferInsert;

// Cohort Analytics Table
export const cohortAnalytics = mysqlTable("cohort_analytics", {
  id: int("id").autoincrement().primaryKey(),
  cohortName: varchar("cohort_name", { length: 255 }).notNull(),
  institutionId: int("institution_id"),
  totalStudents: int("total_students"),
  averageGPA: decimal("average_gpa", { precision: 3, scale: 2 }),
  placementRate: decimal("placement_rate", { precision: 5, scale: 2 }),
  averageSalary: varchar("average_salary", { length: 100 }),
  topSkills: json("top_skills").$type<string[]>(),
  skillGapSummary: json("skill_gap_summary").$type<Record<string, number>>(),
  industryTrends: json("industry_trends").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type CohortAnalytics = typeof cohortAnalytics.$inferSelect;
export type InsertCohortAnalytics = typeof cohortAnalytics.$inferInsert;

// Student Progress Tracking Table
export const studentProgress = mysqlTable("student_progress", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id").notNull(),
  careerPathId: int("career_path_id"),
  skillId: int("skill_id"),
  progressPercentage: decimal("progress_percentage", { precision: 5, scale: 2 }),
  status: mysqlEnum("status", ["not_started", "in_progress", "completed", "paused"]),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("idx_student_id").on(table.studentId)]);

export type StudentProgress = typeof studentProgress.$inferSelect;
export type InsertStudentProgress = typeof studentProgress.$inferInsert;