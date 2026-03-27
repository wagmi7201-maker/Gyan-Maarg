"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { clearAuthSession, hasAuthToken } from "@/lib/auth"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/roadmap-generator", label: "AI Roadmap" },
  { href: "/job-market-intelligence", label: "Job Market" },
  { href: "/course-recommender", label: "Courses" },
]

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    setIsAuthenticated(hasAuthToken())
    setAuthReady(true)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    clearAuthSession()
    setIsAuthenticated(false)
    setIsOpen(false)
    router.push("/login")
  }

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline text-lg font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Gyan-Maarg
          </span>
          <span className="sm:hidden text-sm font-bold">GM</span>
        </Link>

        {/* Desktop Navigation - Right Side */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    active
                      ? "text-foreground bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 pl-6 border-l border-border">
            {authReady && isAuthenticated ? (
              <Button variant="outline" size="sm" className="text-sm" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="text-sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 sm:w-80">
            <div className="flex flex-col gap-1 pt-8">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                      active
                        ? "text-foreground bg-primary/10 border-l-4 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              
              {/* Mobile Divider */}
              <div className="my-4 h-px bg-border" />
              
              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-2">
                {authReady && isAuthenticated ? (
                  <Button variant="outline" className="w-full justify-center" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                      <Button variant="outline" className="w-full justify-center">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full">
                      <Button className="w-full justify-center">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
