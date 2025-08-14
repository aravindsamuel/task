import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useNotify from "../hooks/useNotify";

export default function ForgotPassword() {
  const [emailData, setEmail] = useState({email : ''});
  const notify = useNotify();

  const validateForm = () => {
    if (!emailData.email) {
      notify("Please enter your email", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axiosInstance.post("/forgot-password", emailData);
      notify(res.data.message || "Sent Reset link to your mail", "success");
      setEmail({email : ''});
    } catch (err) {
      notify(err.response?.data?.message || "Failed to send link", "error");
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          value={emailData.email}
          onChange={(e) => setEmail({email: e.target.value})}
          required
        />
        <Button>Send Reset Link</Button>
      </form>
    </AuthLayout>
  );
}
