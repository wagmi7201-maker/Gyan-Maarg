"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterClient() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Password strength
  const getStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  const handleRegister = () => {
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    // 🔴 Validation
    if (!trimmedName || !trimmedEmail || !trimmedPhone || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Enter a valid email");
      return;
    }

    if (!/^[0-9]{10}$/.test(trimmedPhone)) {
      setError("Enter valid 10-digit phone number");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agree) {
      setError("You must agree to Terms & Privacy Policy");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create your account</h1>

        <p style={styles.subtitle}>
          Already have one?{" "}
          <Link href="/login" style={styles.link}>
            Sign in →
          </Link>
        </p>

        {/* Name */}
        <label style={styles.label}>Full Name</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
          style={styles.input}
          placeholder="Your full name"
        />

        {/* Email */}
        <label style={styles.label}>Email Address</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
          style={styles.input}
          placeholder="you@example.com"
        />

        {/* Phone */}
        <label style={styles.label}>Phone Number</label>
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
          style={styles.input}
          placeholder="9876543210"
        />

        {/* Password */}
        <label style={styles.label}>Password</label>
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            style={styles.input}
            placeholder="Create a strong password"
          />
          <span onClick={() => setShowPassword(!showPassword)} style={styles.eye}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Strength */}
        {password && (
          <p style={{ fontSize: "12px", color: "#aaa" }}>
            Strength: {getStrength()}
          </p>
        )}

        {/* Confirm Password */}
        <label style={styles.label}>Confirm Password</label>
        <div style={styles.passwordWrapper}>
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            style={styles.input}
            placeholder="Confirm your password"
          />
          <span onClick={() => setShowConfirm(!showConfirm)} style={styles.eye}>
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Terms */}
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />{" "}
          I agree to Terms & Privacy Policy
        </label>

        {/* Error */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={
            !name || !email || !phone || !password || !confirmPassword || !agree || loading
          }
          style={{
            ...styles.button,
            opacity:
              !name || !email || !phone || !password || !confirmPassword || !agree || loading
                ? 0.6
                : 1,
            cursor:
              !name || !email || !phone || !password || !confirmPassword || !agree || loading
                ? "not-allowed"
                : "pointer",
          }}
        >
          {loading ? "Creating account..." : "→ Create Account"}
        </button>

        <p style={styles.footer}>
          By creating an account, you agree to our Terms & Privacy Policy.
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
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    fontFamily: "sans-serif",
  },

  card: {
    width: "420px",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 0 40px rgba(59,130,246,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  title: {
    fontSize: "28px",
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
  },

  label: {
    fontSize: "13px",
    color: "#ccc",
  },

  input: {
    width: "100%",
    padding: "12px 40px 12px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
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

  checkbox: {
    fontSize: "13px",
    color: "#ccc",
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