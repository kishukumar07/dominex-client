"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { setAuth } = useAuthStore.getState();

function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiRequest("api/auth/login", "POST", { ...formData });
      if (res.accessToken) {
        setAuth(res.data, res.accessToken);
        router.replace("/main/feed");
      }             
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card">
        <span className="brand">Dominex</span>

        <h1 className="heading-lg">Welcome back</h1>
        <p className="text-muted mb-4">Sign in to your account</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="input"
              placeholder="you@example.com"
              type="email"
              value={formData.email}
              onChange={(e) => changeHandler("email", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="input"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={(e) => changeHandler("password", e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center mt-2 mb-4">
            <span />
            <Link href="/auth/forgot-password" className="link">
              Forgot password?
            </Link>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="divider">or</div>

        <p className="text-center text-sm text-muted">
          Dont have an account? {" "}
          <Link href="/auth/register" className="link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
