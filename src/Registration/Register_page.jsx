import { useState } from "react";
import RegisterBG from "../assets/RegisterBG.png"
import logo from "../assets/hero-logo.png"
import { Shield } from "lucide-react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "./GoogleAuthButton";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const Register_page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    const [passwordMatch, setPasswordMatch] = useState(true);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      if (!EMAIL_REGEX.test(formData.email.trim())) {
        setError("Please enter a valid email address");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setPasswordMatch(false);
        return;
      }

      setPasswordMatch(true);
      setLoading(true);

      try {
        const response = await fetch(
          "http://localhost:8081/api/v1/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullName: formData.name,
              email: formData.email.trim(),
              password: formData.password,
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Registration failed. Please try again.",
          );
        }

       const registeredEmail = formData.email.trim();
       setFormData({
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
       });
       navigate("/verify-email", { state: { email: registeredEmail } });
      } catch (err) {
        setError(
          err.message === "Failed to fetch"
            ? "Backend se connection nahi ho pa raha."
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
        style={{ backgroundImage: `URL(${RegisterBG})` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 px-10">
          <div className="w-[200px] h-[80px]">
            <img src={logo} alt="Healix" />
          </div>
          <h1 className="font-serif text-5xl text-white leading-tight">
            Begin your predictive path to wellness
          </h1>
          <p className="text-base text-white/60 tracking-wider py-5">
            Healix translates complex biometric signals and health concerns into
            clearly explained considerations and next-step actions.
          </p>
          <h3 className="text-base rounded-xl w-fit px-3 py-1 bg-[#00C9A7]/10 text-[#00C9A7] flex items-center">
            <Shield className="text-[#00C9A7]" />
            &nbsp; HIPAA Compliant & Secure
          </h3>
        </div>
      </div>
      <div className="h-screen w-3/5 flex justify-center items-center bg-[#F8F9FB]">
        <div className="w-full max-w-[575px] border-2 rounded-3xl shadow-lg py-5 px-10">
          <h1 className="font-serif text-5xl">Create Account</h1>
          <p className="text-base text-black/60 tracking-wider py-2">
            Join the smart personalized healthcare platform
          </p>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-base mb-2 text-black/60 font-semibold font-serif">
                Full Name<span className="text-red-500">*</span>
              </label>
              <TextField
                fullWidth
                required
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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
                placeholder="Create a password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-base mb-2 text-black/60 font-semibold font-serif">
                Confirm Password<span className="text-red-500">*</span>
              </label>

              <TextField
                fullWidth
                required
                type="password"
                placeholder="Create a password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="text-white flex  flex-col justify-start text-lg">
              <button
                type="submit"
                disabled={loading}
                className="border-[#00C9A7] border-2 px-4 py-2 rounded-3xl text-black bg-[#00C9A7] font-semibold font-serif transition-transform duration-500 hover:scale-105 disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Register now ⟶"}
              </button>
              {error && (
                <Alert severity="error" className="mt-4">
                  {error}
                </Alert>
              )}
              <div className="pt-2">
                {passwordMatch ? (
                  ""
                ) : (
                  <Alert severity="error" className="py-2">
                    Password Does not Match
                  </Alert>
                )}
              </div>
            </div>
          </form>
          <div className="mt-3 text-lg">
            <GoogleAuthButton mode="signup" />
          </div>
          <p className="text-center text-black/60 text-lg mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium font-serif text-[#00C9A7] underline"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Register_page