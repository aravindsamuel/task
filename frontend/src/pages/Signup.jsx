import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useNotify from "../hooks/useNotify";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const notify = useNotify();
  const navigate = useNavigate();

  const validateForm = () => {
    const { name, email, password } = form;

    if (!name || !email || !password) {
      notify("Please fill in all fields", "error");
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      notify("Please enter a valid email address", "error");
      return false;
    }

    if (password.length < 6) {
      notify("Password must be at least 6 characters long", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axiosInstance.post("/signup", form);
      notify(res.data.message || "User Created", "success");
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      notify(err.response?.data?.message || "Signup failed", "error");
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <InputField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <InputField
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <Button>Sign Up</Button>
      </form>
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
