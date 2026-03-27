import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JobMarketIntelligenceForm } from "@/components/job-market/market-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Job Market Intelligence | Gyan-Maarg",
  description: "Analyze real-time job market trends, salary data, and demand for skills and career roles",
}

export default function JobMarketIntelligencePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              AI Job Market Intelligence
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Analyze real-time job market trends, salary insights, and career opportunities
            </p>
          </div>

          {/* Form */}
          <JobMarketIntelligenceForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
