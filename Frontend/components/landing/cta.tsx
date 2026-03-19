import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-border/40 py-16 lg:py-24">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-[400px] w-[800px] rounded-full bg-primary/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to transform your career journey?
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Join thousands of students who have already discovered their personalized
            path to career success with Gyan-Maarg.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link href="/student">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/admin">
                Explore Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
