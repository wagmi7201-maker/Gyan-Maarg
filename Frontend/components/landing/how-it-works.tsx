import { UserPlus, Search, Map, Rocket } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description:
      "Build a comprehensive profile with your academic records, projects, skills, and career interests.",
  },
  {
    icon: Search,
    step: "02",
    title: "Get Skill Analysis",
    description:
      "Our AI analyzes your profile against current job market demands to identify skill gaps and opportunities.",
  },
  {
    icon: Map,
    step: "03",
    title: "Receive Your Roadmap",
    description:
      "Get a personalized career roadmap with curated courses, projects, and certifications with timelines.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Achieve Your Goals",
    description:
      "Track your progress, earn milestones, and land your dream job with continuous AI-guided support.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border/40 bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            How it works
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            From skill gaps to career success in 4 steps
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-full hidden h-px w-full bg-border/60 lg:block" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-border/60 bg-card">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
