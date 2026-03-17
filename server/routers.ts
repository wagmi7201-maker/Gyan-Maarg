import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import * as db from "./db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { studentProfiles } from "../drizzle/schema";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  student: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      const profile = await db.getStudentProfile(ctx.user.id);
      return profile || null;
    }),
    updateProfile: protectedProcedure
      .input(z.object({
        institutionName: z.string().optional(),
        degree: z.string().optional(),
        major: z.string().optional(),
        graduationYear: z.number().optional(),
        gpa: z.string().optional(),
        careerInterests: z.array(z.string()).optional(),
        bio: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db_instance = await db.getDb();
        if (!db_instance) throw new Error("Database not available");
        
        const existing = await db.getStudentProfile(ctx.user.id);
        const updateData: any = { ...input };
        if (!existing) {
          await db_instance.insert(studentProfiles).values({
            userId: ctx.user.id,
            ...updateData,
          });
        } else {
          await db_instance.update(studentProfiles).set(updateData).where(eq(studentProfiles.id, existing.id));
        }
        return { success: true };
      }),
    getSkills: protectedProcedure.query(async ({ ctx }) => {
      return await db.getStudentSkills(ctx.user.id);
    }),
    getProjects: protectedProcedure.query(async ({ ctx }) => {
      return await db.getStudentProjects(ctx.user.id);
    }),
    getCareerPath: protectedProcedure.query(async ({ ctx }) => {
      return await db.getStudentCareerPath(ctx.user.id);
    }),
    getSkillGaps: protectedProcedure.query(async ({ ctx }) => {
      return await db.getStudentSkillGaps(ctx.user.id);
    }),
    getProgress: protectedProcedure.query(async ({ ctx }) => {
      return await db.getStudentProgress(ctx.user.id);
    }),
  }),
  
  admin: router({
    getCohortAnalytics: protectedProcedure
      .input(z.object({ cohortName: z.string() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin' && ctx.user.role !== 'placement_cell') {
          throw new Error('Unauthorized');
        }
        return await db.getCohortAnalytics(input.cohortName);
      }),
    getTopSkills: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin' && ctx.user.role !== 'placement_cell') {
        throw new Error('Unauthorized');
      }
      return await db.getTopInDemandSkills(15);
    }),
  }),
});

export type AppRouter = typeof appRouter;
