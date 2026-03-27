"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Sparkles, Mail, Lock, Phone, User } from "lucide-react"
import { getApiBaseUrl, saveAuthSession } from "@/lib/auth"

export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.fullName.trim()) {
      setError("Full name is required")
      return
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email")
      return
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required")
      return
    }
    if (!formData.password) {
      setError("Password is required")
      return
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (!agreedToTerms) {
      setError("You must agree to the Terms & Privacy Policy")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          referralCode: "",
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        const firstError = Object.values(data?.error || {})
          .flat()
          .find(Boolean)
        const message =
          typeof firstError === "string"
            ? firstError
            : "Failed to create account. Please check your details."
        throw new Error(message)
      }

      saveAuthSession(data)
      setSuccess(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      })
      setAgreedToTerms(false)
      router.push("/student")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create account. Please try again."
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
          <h3 className="mb-2 text-xl font-semibold">Account Created Successfully!</h3>
          <p className="mb-6 text-muted-foreground">
            Welcome to Gyan-Maarg. Your account has been created and you can now sign in.
          </p>
          <Link href="/login">
            <Button className="w-full">Sign In to Your Account</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-accent/20 w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join Gyan-Maarg and start your learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>

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

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border border-input"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to{" "}
              <Link href="#" className="font-medium text-foreground hover:text-accent">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-medium text-foreground hover:text-accent">
                Privacy Policy
              </Link>
            </label>
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
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-accent hover:text-accent/80">
              Sign In
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
