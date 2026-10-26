import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

const API = "http://localhost:8081/api/v1/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const readJson = async (response) => {
    try {
      return await response.json();
    } catch {
      return {};
    }
  };

  const callApi = async (endpoint, body) => {
    setLoading(true);
    setError("");
    setInfo("");

    try {
      const response = await fetch(`${API}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(data.message || "Request failed. Please try again.");
      }

      return data;
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot reach the server. Please check whether the backend is running."
          : err.message,
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();

    const data = await callApi("forgot-password", {
      email: email.trim(),
    });

    if (data) {
      setInfo(
        data.message ||
          "If a verified account exists, a reset code has been sent.",
      );
      setStep(2);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(code)) {
      setError("Please enter the 6-digit code.");
      return;
    }

    const data = await callApi("verify-reset-otp", {
      email: email.trim(),
      code,
    });

    if (data) {
      setInfo(data.message || "Code verified successfully.");
      setStep(3);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8 || newPassword.length > 72) {
      setError("Password must be between 8 and 72 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data = await callApi("reset-password", {
      email: email.trim(),
      code,
      newPassword,
    });

    if (data) {
      setInfo(data.message || "Password reset successfully. Please log in.");

      setTimeout(() => navigate("/login"), 1500);
    }
  };

  const titles = {
    1: "Forgot Password?",
    2: "Verify Reset Code",
    3: "Create New Password",
  };

  const descriptions = {
    1: "Enter your registered email to receive a password reset code.",
    2: `We sent a 6-digit code to ${email}. It expires in 10 minutes.`,
    3: "Enter and confirm your new password to secure your account.",
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-full w-full flex items-center justify-center bg-[#F8F9FB] px-4 py-8">
        <div className="w-full max-w-[500px] border-2 border-gray-200 rounded-3xl shadow-lg py-10 px-10 bg-white">
          <h1 className="font-serif text-4xl">{titles[step]}</h1>

          <p className="text-base text-black/60 tracking-wider py-2">
            {descriptions[step]}
          </p>

          <div className="flex gap-2 my-4">
            {[1, 2, 3].map((number) => (
              <div
                key={number}
                className={`h-1.5 flex-1 rounded-full ${
                  step >= number ? "bg-[#00C9A7]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {error && (
            <Alert severity="error" className="mb-3">
              {error}
            </Alert>
          )}

          {info && (
            <Alert severity="success" className="mb-3">
              {info}
            </Alert>
          )}

          {step === 1 && (
            <form
              className="flex flex-col gap-4 mt-3"
              onSubmit={handleSendCode}
            >
              <div>
                <label className="block text-base mb-2 text-black/60 font-semibold font-serif">
                  Email address
                  <span className="text-red-500">*</span>
                </label>

                <TextField
                  fullWidth
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="border-[#00C9A7] border-2 px-4 py-2 rounded-3xl text-black bg-[#00C9A7] font-semibold font-serif text-lg transition-transform duration-500 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Reset Code ⟶"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form
              className="flex flex-col gap-4 mt-3"
              onSubmit={handleVerifyCode}
            >
              <div>
                <label className="block text-base mb-2 text-black/60 font-semibold font-serif">
                  Verification code
                  <span className="text-red-500">*</span>
                </label>

                <TextField
                  fullWidth
                  required
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  inputProps={{
                    inputMode: "numeric",
                    maxLength: 6,
                    style: {
                      letterSpacing: "0.5em",
                      textAlign: "center",
                      fontSize: "1.25rem",
                    },
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="border-[#00C9A7] border-2 px-4 py-2 rounded-3xl text-black bg-[#00C9A7] font-semibold font-serif text-lg transition-transform duration-500 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify Code ⟶"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setCode("");
                  setError("");
                  setInfo("");
                }}
                className="font-medium font-serif text-[#00C9A7] underline"
              >
                Change email address
              </button>
            </form>
          )}

          {step === 3 && (
            <form
              className="flex flex-col gap-4 mt-3"
              onSubmit={handleResetPassword}
            >
              <div>
                <label className="block text-base mb-2 text-black/60 font-semibold font-serif">
                  New password
                  <span className="text-red-500">*</span>
                </label>

                <TextField
                  fullWidth
                  required
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  inputProps={{
                    minLength: 8,
                    maxLength: 72,
                  }}
                />
              </div>

              <div>
                <label className="block text-base mb-2 text-black/60 font-semibold font-serif">
                  Confirm password
                  <span className="text-red-500">*</span>
                </label>

                <TextField
                  fullWidth
                  required
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="border-[#00C9A7] border-2 px-4 py-2 rounded-3xl text-black bg-[#00C9A7] font-semibold font-serif text-lg transition-transform duration-500 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Resetting..." : "Reset Password ⟶"}
              </button>
            </form>
          )}

          <p className="text-center text-black/60 text-lg mt-4">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium font-serif text-[#00C9A7] underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
