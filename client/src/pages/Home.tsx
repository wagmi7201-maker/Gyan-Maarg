import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { Sparkles, Target, TrendingUp, Users, BookOpen, Zap } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Gyan-Maarg</h1>
          </div>
          <div>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600">Welcome, {user?.name}</span>
                {user?.role === 'admin' || user?.role === 'placement_cell' ? (
                  <Button onClick={() => setLocation("/admin/dashboard")}>Admin Dashboard</Button>
                ) : (
                  <Button onClick={() => setLocation("/student/dashboard")}>Student Dashboard</Button>
                )}
              </div>
            ) : (
              <Button asChild>
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Your AI-Powered Career Guide
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Bridge the skill gap between academic learning and industry demands. Get personalized career roadmaps powered by GenAI and real-time job market data.
          </p>
          {!isAuthenticated && (
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
              <a href={getLoginUrl()}>Get Started</a>
            </Button>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Personalized Roadmaps</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AI-generated career paths tailored to your skills, interests, and market demands
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle>Skill Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Identify gaps between your current skills and industry requirements with semantic matching
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Curated Learning Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Recommended courses, projects, and certifications from top platforms
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Features Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">For Students</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Build your profile with academic records and projects</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Get AI-powered skill gap analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Track progress toward your career goals</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Access personalized learning recommendations</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">For Placement Cells</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Monitor cohort-level skill gaps and trends</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Track placement outcomes and statistics</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Identify industry trends and opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Benchmark against market demands</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="bg-white border-slate-200 mb-16">
          <CardHeader>
            <CardTitle>Powered by Advanced Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg text-center">
                <p className="font-semibold text-slate-900">GenAI</p>
                <p className="text-sm text-slate-600">Intelligent recommendations</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg text-center">
                <p className="font-semibold text-slate-900">RAG System</p>
                <p className="text-sm text-slate-600">Knowledge retrieval</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg text-center">
                <p className="font-semibold text-slate-900">Real-time Data</p>
                <p className="text-sm text-slate-600">Job market insights</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg text-center">
                <p className="font-semibold text-slate-900">Semantic Matching</p>
                <p className="text-sm text-slate-600">Skill alignment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        {!isAuthenticated && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h3>
            <p className="text-lg mb-8 opacity-90">Join thousands of students getting personalized career guidance</p>
            <Button size="lg" variant="secondary" asChild>
              <a href={getLoginUrl()}>Start Your Journey</a>
            </Button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-600">
          <p>Gyan-Maarg • Empowering India's youth with AI-driven career guidance</p>
          <p className="text-sm mt-2">ET GenAI Hackathon 2026</p>
        </div>
      </footer>
    </div>
  );
}
