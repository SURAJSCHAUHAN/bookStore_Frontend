import React, { useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    console.log("Form Data", form);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (!res.ok) {
        console.log(res);
        throw new Error("Login Failed");
      }
      const data = await res.json();
      console.log("Login Success", data);
      window.location.href = "/";
      setForm({
        username: "",
        email: "",
        role: "",
        password: "",
      });
      // window.alert("Login Success");
    } catch (error) {
      console.log("Login failed ", error);
    }
  };
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex flex-col gap-3 w-[30%]">
        <input
          className="p-2 rounded-xl border border-gray-500"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="email"
        />
        <input
          className="p-2 rounded-xl border border-gray-500"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button
          onClick={handleLogin}
          className="p-2 rounded-xl border bg-gray-500 text-white hover:bg-gray-900"
        >
          Login
        </button>
        <p className="text-center">
          New User!{" "}
          <a href="/signup" className="text-blue-600">
            SignUp
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
