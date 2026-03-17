import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, AlertCircle, BarChart3, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [cohortName, setCohortName] = useState("Batch 2024");

  const cohortQuery = trpc.admin.getCohortAnalytics.useQuery({ cohortName });
  const topSkillsQuery = trpc.admin.getTopSkills.useQuery();

  if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'placement_cell')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const isLoading = cohortQuery.isLoading || topSkillsQuery.isLoading;

  // Sample data for visualization
  const skillDemandData = [
    { skill: "Python", demand: 85, students: 72 },
    { skill: "JavaScript", demand: 78, students: 65 },
    { skill: "React", demand: 72, students: 58 },
    { skill: "SQL", demand: 80, students: 70 },
    { skill: "Cloud", demand: 68, students: 45 },
  ];

  const placementTrendData = [
    { month: "Jan", placed: 12, target: 20 },
    { month: "Feb", placed: 18, target: 20 },
    { month: "Mar", placed: 25, target: 20 },
    { month: "Apr", placed: 28, target: 20 },
    { month: "May", placed: 32, target: 20 },
    { month: "Jun", placed: 35, target: 20 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Placement Cell Dashboard</h1>
          <p className="text-slate-600">Cohort analytics and industry trend monitoring</p>
        </div>

        {/* Cohort Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Select Cohort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                placeholder="Enter cohort name"
                value={cohortName}
                onChange={(e) => setCohortName(e.target.value)}
                className="max-w-xs"
              />
              <Button onClick={() => cohortQuery.refetch()}>Load Cohort Data</Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{cohortQuery.data?.totalStudents || 0}</div>
              <p className="text-xs text-slate-500 mt-1">In cohort</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Placement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{cohortQuery.data?.placementRate || 0}%</div>
              <p className="text-xs text-slate-500 mt-1">Placed students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Avg Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{cohortQuery.data?.averageSalary || "N/A"}</div>
              <p className="text-xs text-slate-500 mt-1">Package</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Avg GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{cohortQuery.data?.averageGPA || 0}</div>
              <p className="text-xs text-slate-500 mt-1">Cohort average</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
            <TabsTrigger value="trends">Industry Trends</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Skill Gap Distribution
                </CardTitle>
                <CardDescription>Skills with highest gaps across cohort</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-slate-400" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={skillDemandData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="skill" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="demand" fill="#3b82f6" name="Market Demand" />
                      <Bar dataKey="students" fill="#10b981" name="Students Proficient" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Placement Trend
                </CardTitle>
                <CardDescription>Monthly placement progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={placementTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="placed" stroke="#10b981" name="Placed" strokeWidth={2} />
                    <Line type="monotone" dataKey="target" stroke="#ef4444" name="Target" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Top In-Demand Skills</CardTitle>
                <CardDescription>Skills most sought by employers</CardDescription>
              </CardHeader>
              <CardContent>
                {topSkillsQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-slate-400" />
                  </div>
                ) : topSkillsQuery.data && topSkillsQuery.data.length > 0 ? (
                  <div className="space-y-3">
                    {topSkillsQuery.data.slice(0, 10).map((job, idx) => (
                      <div key={job.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{job.jobTitle}</h4>
                          <p className="text-sm text-slate-600">{job.industry} • {job.company}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {job.requiredSkills.slice(0, 3).map((skill, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900">{job.jobCount} openings</p>
                          <p className="text-xs text-slate-500">{job.demandTrend}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600">No job market data available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Industry Trends
                </CardTitle>
                <CardDescription>Emerging sectors and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                {cohortQuery.data?.industryTrends && cohortQuery.data.industryTrends.length > 0 ? (
                  <div className="space-y-3">
                    {cohortQuery.data.industryTrends.map((trend, idx) => (
                      <div key={idx} className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                        <p className="font-semibold text-slate-900">{trend}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <p>No industry trends data available for this cohort</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Top Skills in Cohort</CardTitle>
              </CardHeader>
              <CardContent>
                {cohortQuery.data?.topSkills && cohortQuery.data.topSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {cohortQuery.data.topSkills.map((skill, idx) => (
                      <span key={idx} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600">No skill data available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
