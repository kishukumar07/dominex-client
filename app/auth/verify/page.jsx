"use client";

import { useState, Suspense } from "react";
import { apiRequest } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";

// main component logic
function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // state
  const userId = searchParams.get("userId");
  const [VerifyData, setVerifyData] = useState({
    userId: userId || "", // Fallback to safe empty string if undefined at initial render
    otp: "",
  });
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  // func.
  const changeHandler = (key, value) => {
    setVerifyData({ ...VerifyData, [key]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!userId) {
      router.replace("/auth/register");
      return;
    }

    if (!VerifyData.otp) return setError("Please enter the OTP");
    setLoading(true);
    try {
      const res = await apiRequest("api/auth/verifyOtp", "POST", VerifyData);
      if (res.success) {
        alert("Email Verified Please Enter Your Credentials.");
        router.push("/auth/login");
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card">
        <span className="brand">Dominex</span>
        <h1 className="heading-lg">VERIFY YOUR EMAIL </h1>
        <p className="text-muted mb-4">
          Please Enter the six digit Code sent to you Email...{" "}
        </p>
        {Error && <div className="alert alert-error"> {Error} </div>}
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
          onSubmit={submitHandler}
        >
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="otp">
              OTP
            </label>
            <input
              type="text"
              placeholder="eg.XXXYYY"
              required
              className="input"
              value={VerifyData.otp}
              onChange={(e) => {
                changeHandler("otp", e.target.value);
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={Loading}
            style={{ gridColumn: "1 / -1" }}
          >
            {Loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Exporting the component wrapped in a Suspense boundary
export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={<div className="page-center">Loading verification...</div>}
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
