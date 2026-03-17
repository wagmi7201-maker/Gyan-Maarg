import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createStudentContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "student-user-1",
    email: "student@example.com",
    name: "John Doe",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

function createAdminContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "admin-user-1",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Student Routes", () => {
  it("student.getProfile returns null when no profile exists", async () => {
    const { ctx } = createStudentContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.student.getProfile();
    expect(result).toBeNull();
  });

  it("student.getSkills returns empty array when no skills exist", async () => {
    const { ctx } = createStudentContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.student.getSkills();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it("student.getProjects returns empty array when no projects exist", async () => {
    const { ctx } = createStudentContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.student.getProjects();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it("student.getCareerPath returns undefined when no career path exists", async () => {
    const { ctx } = createStudentContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.student.getCareerPath();
    expect(result).toBeUndefined();
  });

  it("student.getSkillGaps returns empty array when no gaps exist", async () => {
    const { ctx } = createStudentContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.student.getSkillGaps();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it("student.getProgress returns empty array when no progress exists", async () => {
    const { ctx } = createStudentContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.student.getProgress();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});

describe("Admin Routes", () => {
  it("admin.getCohortAnalytics requires admin or placement_cell role", async () => {
    const { ctx } = createStudentContext();
    const caller = appRouter.createCaller(ctx);
    
    try {
      await caller.admin.getCohortAnalytics({ cohortName: "Batch 2024" });
      expect.fail("Should throw unauthorized error");
    } catch (error: any) {
      expect(error.message).toBe("Unauthorized");
    }
  });

  it("admin.getCohortAnalytics succeeds with admin role", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.admin.getCohortAnalytics({ cohortName: "Batch 2024" });
    expect(result).toBeUndefined(); // No data in test DB
  });

  it("admin.getTopSkills requires admin or placement_cell role", async () => {
    const { ctx } = createStudentContext();
    const caller = appRouter.createCaller(ctx);
    
    try {
      await caller.admin.getTopSkills();
      expect.fail("Should throw unauthorized error");
    } catch (error: any) {
      expect(error.message).toBe("Unauthorized");
    }
  });

  it("admin.getTopSkills succeeds with admin role", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.admin.getTopSkills();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Auth Routes", () => {
  it("auth.me returns current user", async () => {
    const { ctx } = createStudentContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.auth.me();
    expect(result).toBeDefined();
    expect(result?.email).toBe("student@example.com");
    expect(result?.role).toBe("user");
  });

  it("auth.logout clears session cookie", async () => {
    const { ctx } = createStudentContext();
    let cookieCleared = false;
    
    ctx.res = {
      clearCookie: () => {
        cookieCleared = true;
      },
    } as any;
    
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    
    expect(result.success).toBe(true);
    expect(cookieCleared).toBe(true);
  });
});
