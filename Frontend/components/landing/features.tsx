import {
  Target,
  TrendingUp,
  Users,
  BookOpen,
  BarChart3,
  Lightbulb,
} from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Personalized Roadmaps",
    description:
      "AI-generated learning paths tailored to your profile, skills, and career aspirations with realistic timelines.",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Analysis",
    description:
      "Semantic matching between your capabilities and industry requirements to identify critical skill gaps.",
  },
  {
    icon: BarChart3,
    title: "Job Market Intelligence",
    description:
      "Real-time integration with job market data to identify in-demand skills and emerging opportunities.",
  },
  {
    icon: BookOpen,
    title: "Learning Recommendations",
    description:
      "Curated courses, projects, and certifications from top platforms like Coursera, edX, and Udemy.",
  },
  {
    icon: Users,
    title: "Cohort Analytics",
    description:
      "Placement cell dashboards for monitoring student progress, industry trends, and placement statistics.",
  },
  {
    icon: Lightbulb,
    title: "Progress Tracking",
    description:
      "Monitor your advancement toward career goals with milestones, achievements, and personalized insights.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            What we do
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Comprehensive career guidance for every stage
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Our AI-powered platform addresses the critical skill mismatch problem
            in India's education system with intelligent, data-driven solutions.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:bg-card/80"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
