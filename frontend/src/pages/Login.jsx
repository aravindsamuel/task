import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useNotify from "../hooks/useNotify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notify = useNotify();
  const navigate = useNavigate();

   const validateForm = () => {
    if (!email || !password) {
      notify("Please fill in all fields", "error");
      return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      notify("Please enter a valid email address", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
        const payload = {
            email,
            password
        }
      const res = await axiosInstance.post('/signin', payload);
      localStorage.setItem("token", res.data.token);
      notify(res.data.message || "Login successful", "success");
      setEmail('');
      setPassword('');
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      notify(
        err.response?.data?.message || "Login failed",
        "error"
      );
    }
  };

  return (
    <AuthLayout title="Login">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button>Login</Button>
      </form>
      <div className="flex justify-between items-center mt-4 text-sm">
        <Link to="/forgot-password" className="text-indigo-600 hover:underline">Forgot Password?</Link>
        <Link to="/signup" className="text-indigo-600 hover:underline">Create Account</Link>
      </div>
    </AuthLayout>
  );
}
