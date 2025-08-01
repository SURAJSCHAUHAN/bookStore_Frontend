import React, { useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async () => {
    console.log("Form Data", form);
    try {
      const res = await fetch(
        "https://book-store-backend-suraj.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) {
        throw new Error("SignUp Failed");
      }
      const data = await res.json();
      console.log("SignUp Success", data);
      window.location.href = "/";
      setForm({
        username: "",
        email: "",
        role: "",
        password: "",
      });
      // window.alert("SignUp Success");
    } catch (error) {
      console.log("SignUP failed ", error);
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex flex-col gap-3 w-[30%]">
        <input
          className="p-2 rounded-xl border border-gray-500"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          className="p-2 rounded-xl border border-gray-500"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="email"
        />

        <div>
          <select
            id="countries"
            name="role"
            value={form.role}
            onChange={handleChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option selected>Choose a Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <input
          className="p-2 rounded-xl border border-gray-500"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="password"
        />

        {/* <input
          className="p-2 rounded-xl border border-gray-500"
          type="password"
          placeholder="confirm password"
        /> */}

        <button
          onClick={handleSignUp}
          className="p-2 rounded-xl border bg-gray-500 text-white hover:bg-gray-900"
        >
          SignUp
        </button>
        <p className="text-center">
          Already a user!{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
