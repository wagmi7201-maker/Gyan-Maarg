"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Auto focus on email
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleLogin = async () => {
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // 🔴 Validation
    if (!trimmedEmail || !trimmedPassword) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Enter a valid email");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (trimmedEmail !== "test@gmail.com" || trimmedPassword !== "123456") {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome back</h1>

        <p style={styles.subtitle}>
          New here?{" "}
          <Link href="/register" style={styles.link}>
            Create a free account →
          </Link>
        </p>

        {/* Email */}
        <label style={styles.label}>Email Address</label>
        <input
          ref={emailRef}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{
            ...styles.input,
            border: error
              ? "1px solid #f87171"
              : "1px solid rgba(255,255,255,0.2)",
          }}
        />

        {/* Password */}
        <label style={styles.label}>Password</label>
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{
              ...styles.input,
              border: error
                ? "1px solid #f87171"
                : "1px solid rgba(255,255,255,0.2)",
            }}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eye}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Row */}
        <div style={styles.row}>
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />{" "}
            Remember me
          </label>

          {/* ✅ Clickable */}
          <Link href="/forgot-password" style={styles.link}>
            Forgot password?
          </Link>
        </div>

        {/* Error */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={!email || !password || loading}
          style={{
            ...styles.button,
            opacity: !email || !password || loading ? 0.6 : 1,
            cursor:
              !email || !password || loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing in..." : "→ Sign In to Gyan-Maarg"}
        </button>

        <p style={styles.footer}>
          By signing in, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `
      linear-gradient(135deg, #0f172a, #1e293b)
    `,
    color: "white",
    fontFamily: "sans-serif",
  },

  card: {
    width: "400px",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 0 40px rgba(59,130,246,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  title: {
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#aaa",
  },

  link: {
    color: "#60a5fa",
    textDecoration: "none",
    cursor: "pointer",
  },

  label: {
    fontSize: "13px",
    color: "#ccc",
  },

  passwordWrapper: {
    position: "relative",
  },

  eye: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    padding: "12px 40px 12px 12px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
  },

  error: {
    color: "#f87171",
    fontSize: "13px",
    textAlign: "center",
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #3b82f6, #6366f1)",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
  },

  footer: {
    fontSize: "11px",
    color: "#888",
    textAlign: "center",
    marginTop: "10px",
  },
};