// Server Component (NO "use client")

export const metadata = {
  title: "Gyan-Maarg | Sign In",
  description: "Login to access your personalized career roadmap",
};

import LoginClient from "./LoginClient";

export default function LoginPage() {
  return <LoginClient />;
}