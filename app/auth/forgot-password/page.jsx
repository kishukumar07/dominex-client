"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ForgotPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);

  const changeHandler = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await apiRequest("users/passwordReset", "PATCH", formData);

      if (res.success) {
        setSuccess(res.msg);

        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      } else {
        setError(res.msg);
      }
    } catch (err) {
      setError(err?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handelOtpSendReq = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      return setError("Please enter your registered email");
    }

    setLoadingOtp(true);
    setError("");
    setSuccess("");

    try {
      const res = await apiRequest("users/requestResetEmail", "PATCH", {
        email: formData.email,
      });

      if (res.success) {
        setSuccess(res.msg);
      } else {
        setError(res.msg);
      }
    } catch (err) {
      setError(err?.msg || "Failed to send OTP");
    } finally {
      setLoadingOtp(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card">
        <span className="brand">Dominex</span>

        <h1 className="heading-lg">Forgot Password</h1>
        <p className="text-muted mb-4">Reset your account password</p>

        {error && <div className="alert alert-error">{error}</div>}

        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Registered Email</label>
            <input
              className="input"
              type="email"
              placeholder="Enter your registered email"
              value={formData.email}
              onChange={(e) => changeHandler("email", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              className="input"
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={(e) => changeHandler("newPassword", e.target.value)}
              required
            />
          </div>

          <div
            className="form-group"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <button
              className="btn btn-primary"
              type="button"
              onClick={handelOtpSendReq}
              disabled={loadingOtp}
            >
              {loadingOtp ? "Sending..." : "Request OTP"}
            </button>

            <input
              className="input"
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={(e) => changeHandler("otp", e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Updating Password..." : "Update Password"}
          </button>

          <div className="flex justify-between items-center mt-2 mb-4">
            <span />
            <Link href="/auth/login" className="link">
              Sign In?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPage;
