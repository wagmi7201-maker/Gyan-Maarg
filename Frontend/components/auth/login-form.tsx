"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Sparkles, Mail, Lock } from "lucide-react"
import { getApiBaseUrl, saveAuthSession } from "@/lib/auth"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validation
    if (!formData.email.trim()) {
      setError("Email is required")
      return
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email")
      return
    }
    if (!formData.password) {
      setError("Password is required")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        const message =
          typeof data?.error === "string"
            ? data.error
            : "Failed to sign in. Please check your credentials."
        throw new Error(message)
      }

      saveAuthSession(data)
      setSuccess(true)
      console.log("[v0] Login with:", { email: formData.email, rememberMe })
      router.push("/student")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to sign in. Please try again."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="border-accent/20 w-full max-w-md">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold">Welcome Back!</h3>
          <p className="mb-6 text-muted-foreground">
            You have successfully signed in to Gyan-Maarg.
          </p>
          <Button className="w-full">Go to Dashboard</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-accent/20 w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In to Gyan-Maarg</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border border-input"
              />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <Link
              href="#"
              className="text-sm font-medium text-accent hover:text-accent/80"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Signing In..." : "Sign In to Gyan-Maarg"}
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-accent hover:text-accent/80">
              Create Account
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
