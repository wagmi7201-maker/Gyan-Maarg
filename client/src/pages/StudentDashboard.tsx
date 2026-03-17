import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, AlertCircle, TrendingUp, BookOpen, Target } from "lucide-react";
import { useLocation } from "wouter";

export default function StudentDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const profileQuery = trpc.student.getProfile.useQuery();
  const skillsQuery = trpc.student.getSkills.useQuery();
  const projectsQuery = trpc.student.getProjects.useQuery();
  const careerPathQuery = trpc.student.getCareerPath.useQuery();
  const skillGapsQuery = trpc.student.getSkillGaps.useQuery();
  const progressQuery = trpc.student.getProgress.useQuery();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please log in to access your dashboard</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const isLoading = profileQuery.isLoading || skillsQuery.isLoading || careerPathQuery.isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, {user?.name || "Student"}</h1>
          <p className="text-slate-600">Your personalized career guidance dashboard</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{skillsQuery.data?.length || 0}</div>
              <p className="text-xs text-slate-500 mt-1">Skills added</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Skill Gaps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{skillGapsQuery.data?.length || 0}</div>
              <p className="text-xs text-slate-500 mt-1">Identified gaps</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{progressQuery.data?.length || 0}</div>
              <p className="text-xs text-slate-500 mt-1">Active learning paths</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {careerPathQuery.isLoading ? (
              <Card>
                <CardContent className="pt-6 flex justify-center">
                  <Loader2 className="animate-spin text-slate-400" />
                </CardContent>
              </Card>
            ) : careerPathQuery.data ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Your Career Path
                  </CardTitle>
                  <CardDescription>Target role: {careerPathQuery.data.targetRole}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 mb-2">Estimated Timeline</h4>
                    <p className="text-slate-600">{careerPathQuery.data.estimatedTimeMonths} months</p>
                  </div>
                  {careerPathQuery.data.recommendedCourses && careerPathQuery.data.recommendedCourses.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 mb-2">Recommended Courses</h4>
                      <ul className="space-y-1">
                        {careerPathQuery.data.recommendedCourses.slice(0, 3).map((course, idx) => (
                          <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-amber-700 bg-amber-50 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <p>Complete your profile to generate a personalized career roadmap</p>
                  </div>
                  <Button onClick={() => setLocation("/student/profile")} className="mt-4">
                    Complete Profile
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Skill Gaps */}
            {skillGapsQuery.data && skillGapsQuery.data.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Top Skill Gaps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {skillGapsQuery.data.slice(0, 5).map((gap) => (
                      <div key={gap.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">{gap.skillName}</p>
                          <p className="text-sm text-slate-500">Priority: {gap.priority}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          gap.gapSeverity === 'critical' ? 'bg-red-100 text-red-700' :
                          gap.gapSeverity === 'high' ? 'bg-orange-100 text-orange-700' :
                          gap.gapSeverity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {gap.gapSeverity}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>View and manage your academic and career information</CardDescription>
              </CardHeader>
              <CardContent>
                {profileQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-slate-400" />
                  </div>
                ) : profileQuery.data ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">Institution</h4>
                      <p className="text-slate-600">{profileQuery.data.institutionName || "Not specified"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Degree & Major</h4>
                      <p className="text-slate-600">
                        {profileQuery.data.degree} in {profileQuery.data.major || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">GPA</h4>
                      <p className="text-slate-600">{profileQuery.data.gpa || "Not specified"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Career Interests</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileQuery.data.careerInterests && profileQuery.data.careerInterests.length > 0 ? (
                          profileQuery.data.careerInterests.map((interest, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {interest}
                            </span>
                          ))
                        ) : (
                          <p className="text-slate-500">No interests specified</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600">No profile data yet. Create your profile to get started.</p>
                )}
                <Button onClick={() => setLocation("/student/profile")} className="mt-6">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap">
            <Card>
              <CardHeader>
                <CardTitle>Career Roadmap</CardTitle>
                <CardDescription>Your personalized path to your target role</CardDescription>
              </CardHeader>
              <CardContent>
                {careerPathQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-slate-400" />
                  </div>
                ) : careerPathQuery.data ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Target Role</h4>
                      <p className="text-lg text-blue-600 font-medium">{careerPathQuery.data.targetRole}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Recommended Learning Path</h4>
                      <div className="space-y-2">
                        {careerPathQuery.data.recommendedCourses?.map((course, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                              {idx + 1}
                            </div>
                            <span className="text-slate-700">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600">No roadmap generated yet. Complete your profile first.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Track your advancement toward your career goals</CardDescription>
              </CardHeader>
              <CardContent>
                {progressQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-slate-400" />
                  </div>
                ) : progressQuery.data && progressQuery.data.length > 0 ? (
                  <div className="space-y-4">
                    {progressQuery.data.map((item) => (
                      <div key={item.id} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate-900">Learning Path {item.id}</h4>
                          <span className="text-sm font-medium text-slate-600">{item.progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${item.progressPercentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Status: {item.status}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600">No active learning paths yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
