import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import useNotify from "../hooks/useNotify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { token } = useParams();
  const notify = useNotify();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      notify("Please fill all fields", "error");
      return;
    }
    if (password !== confirm) {
      notify("Passwords do not match", "error");
      return;
    }

    try {
      const res = await axiosInstance.post(`/reset-password/${token}`, { password });
      notify(res.data.message || "Password reset successful", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      notify(err.response?.data?.message || "Failed to reset password", "error");
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <form className="space-y-4" onSubmit={handleSubmit}>
        
        {/* New Password */}
        <div className="relative">
          <InputField
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <InputField
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <Button>Reset Password</Button>
      </form>
    </AuthLayout>
  );
}
