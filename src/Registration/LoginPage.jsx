import { useState } from "react";
import LoginBG from "../assets/LoginBG.png";
import logo from "../assets/hero-logo.png";
import { Shield } from "lucide-react";
import TextField from "@mui/material/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { FcGoogle } from "react-icons/fc";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import GoogleAuthButton from "./GoogleAuthButton";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const justVerified = location.state?.verified;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.userId,
          fullName: data.fullName,
          email: data.email,
          onboardingStatus: data.onboardingStatus,
        }),
      );

      setFormData({
        email: "",
        password: "",
      });

      // First-time user -> onboarding. Everyone else -> home.
      navigate(
        data.onboardingStatus === "PENDING" ? "/onboarding" : "/Healix_Home",
      );
    } catch (err) {
      if (err.message === "Please verify your email first") {
        navigate("/verify-email", {
          state: { email: formData.email.trim() },
        });
        return;
      }

      setError(
        err.message === "Failed to fetch"
          ? "Backend is not running"
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div
        className="h-screen w-2/5 bg-cover bg-center relative"
        style={{ backgroundImage: `URL(${LoginBG})` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 px-10">
          <div className="w-[200px] h-[80px]">
            <img src={logo} alt="Healix" />
          </div>
          <h1 className="font-serif text-5xl text-white leading-tight">
            Welcome back to your healthcare dashboard
          </h1>
          <p className="text-base text-white/60 tracking-wider py-5">
            Access customized medical information, track persistent symptoms,
            and coordinate safely with local medical providers.
          </p>
          <h3 className="text-base rounded-xl w-fit px-3 py-1 bg-[#00C9A7]/10 text-[#00C9A7] flex items-center">
            <Shield className="text-[#00C9A7]" />
            &nbsp; HIPAA Compliant & Secure
          </h3>
        </div>
      </div>

      <div className="h-screen w-3/5 flex justify-center items-center bg-[#F8F9FB]">
        <div className="w-full max-w-[500px] border-2 rounded-3xl shadow-lg py-10 px-10">
          <h1 className="font-serif text-5xl">Sign in to Healix</h1>
          <p className="text-base text-black/60 tracking-wider py-2">
            Enter your credentials to continue your journey
          </p>

          {justVerified && (
            <Alert severity="success" className="mb-3">
              Email verified! Please sign in.
            </Alert>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-base mb-2 text-black/60 font-semibold font-serif">
                Email address<span className="text-red-500">*</span>
              </label>

              <TextField
                fullWidth
                required
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-base mb-2 text-black/60 font-semibold font-serif">
                Password<span className="text-red-500">*</span>
              </label>

              <TextField
                fullWidth
                required
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="text-[#00C9A7] flex justify-between items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: "#00C9A7",
                      "&.Mui-checked": {
                        color: "#00C9A7",
                      },
                      transform: "scale(0.8)",
                    }}
                  />
                }
                label="Remember Me"
                sx={{
                  color: "black",
                  "& .MuiFormControlLabel-label": {
                    fontSize: "18px",
                    fontFamily: "serif",
                  },
                }}
              />
              <Link
                to="/forgotPasswd"
                className="font-medium font-serif text-[#00C9A7] underline"
              >
                Forget Password
              </Link>
            </div>

            <div className="text-white flex flex-col justify-start text-lg">
              <button
                type="submit"
                disabled={loading}
                className="border-[#00C9A7] border-2 px-4 py-2 rounded-3xl
                text-black bg-[#00C9A7] font-semibold font-serif
                transition-transform duration-500 hover:scale-105
                disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In ⟶"}
              </button>

              <div className="pt-2">
                {error && <Alert severity="error">{error}</Alert>}
              </div>

              <div className="mt-3 text-lg">
                <GoogleAuthButton mode="login" />
              </div>
            </div>
          </form>

          <p className="text-center text-black/60 text-lg mt-3">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium font-serif text-[#00C9A7] underline"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
