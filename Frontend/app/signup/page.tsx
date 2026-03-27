import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SignupForm } from "@/components/auth/signup-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up | Gyan-Maarg",
  description: "Create your Gyan-Maarg account and start your personalized learning journey",
}

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Join Gyan-Maarg
            </h1>
            <p className="mt-2 text-muted-foreground">
              Begin your AI-guided career journey today
            </p>
          </div>

          {/* Signup Form */}
          <SignupForm />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
