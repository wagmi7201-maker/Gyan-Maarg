import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RoadmapForm } from "@/components/roadmap/roadmap-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Roadmap Generator | Gyan-Maarg",
  description: "Generate personalized career roadmaps powered by AI and real-time job market data",
}

export default function RoadmapGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              AI-Powered Career Roadmap Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get a personalized learning path to achieve your career goals
            </p>
          </div>

          {/* Form */}
          <RoadmapForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
