import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CourseRecommenderForm } from "@/components/course-recommender/recommender-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Course Recommender | Gyan-Maarg",
  description: "Get personalized course recommendations based on your skills and career goals",
}

export default function CourseRecommenderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              AI Course Recommender
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover the perfect courses tailored to your skills and career goals
            </p>
          </div>

          {/* Form */}
          <CourseRecommenderForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
