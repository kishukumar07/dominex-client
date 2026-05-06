"use client";

import { React, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
const { setAuth } = useAuthStore.getState();

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await apiRequest("api/auth/login", "POST", { ...formData });
    // console.log(res.user, res.accessToken);
    // -> zustand +ls token +user
    const token = res;
    // localStorage.setItem("token", res.token); //acessToken
    setAuth(res.user, res.accessToken);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your Registered Email"
          type="email"
          value={formData.email}
          onChange={(e) => {
            changeHandler("email", e.target.value);
          }}
        />
        <input
          placeholder="Enter your Password"
          type="password"
          value={formData.password}
          onChange={(e) => {
            changeHandler("password", e.target.value);
          }}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
