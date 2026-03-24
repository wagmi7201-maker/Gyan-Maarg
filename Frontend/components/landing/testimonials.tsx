import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Gyan-Maarg helped me identify exactly what skills I needed to land my dream job at a top tech company. The personalized roadmap was a game-changer.",
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    initials: "PS",
  },
  {
    quote:
      "As a placement coordinator, the cohort analytics dashboard has transformed how we track and support our students. Placement rates have increased by 40%.",
    name: "Dr. Rajesh Kumar",
    role: "Placement Cell Head, IIT Delhi",
    initials: "RK",
  },
  {
    quote:
      "The skill gap analysis was eye-opening. I didn't realize how important certain technologies had become in the job market until Gyan-Maarg showed me.",
    name: "Amit Patel",
    role: "Data Scientist at Amazon",
    initials: "AP",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Testimonials
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by students and institutions
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-border/60 bg-card/50 backdrop-blur"
            >
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/40" />
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
