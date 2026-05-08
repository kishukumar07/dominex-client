"use client";

import { apiRequest } from "@/lib/api";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const router = useRouter();
  //STATES ...

  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    username: "",
  });

  //FUNCTIONS ..

  const changeHandler = (key, value) => {
    setFormData({ ...FormData, [key]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiRequest("api/auth/register", "POST", {
        ...FormData,
      });

      if (res.success) {
        router.push(`/auth/verify?userId=${res.data._id}`);
      } else {
        setError(res.message);
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
        <h1 className="heading-lg">Welcome user </h1>
        <p className="text-muted mb-4">Register your account </p>
        {Error && <div className="alert alert-error"> {Error} </div>}

        <form
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
          onSubmit={handelSubmit}
        >
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              placeholder="eg. Adlerlin bishmith"
              type="text"
              required
              value={FormData.name}
              onChange={(e) => {
                changeHandler("name", e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              UserName
            </label>
            <input
              className="input"
              placeholder="eg. Adler_07"
              type="text"
              required
              value={FormData.username}
              onChange={(e) => {
                changeHandler("username", e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Password
            </label>
            <input
              className="input"
              placeholder="Write your Password "
              type="password"
              required
              value={FormData.password}
              onChange={(e) => {
                changeHandler("password", e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Email
            </label>
            <input
              className="input"
              placeholder="xyz@gmail.com "
              type="email"
              required
              value={FormData.email}
              onChange={(e) => {
                changeHandler("email", e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Phone
            </label>

            <input
              className="input"
              placeholder="6207760272"
              type="text"
              value={FormData.phone}
              onChange={(e) => {
                changeHandler("phone", e.target.value);
              }}
              required
            />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={Loading}
            style={{ gridColumn: "1 / -1" }}
          >
            {Loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <div className="divider">or</div>

        <p className="text-center text-sm text-muted">
          {" "}
          Do you have account ?{" "}
          <Link href="/auth/login" className="link">
            {" "}
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
