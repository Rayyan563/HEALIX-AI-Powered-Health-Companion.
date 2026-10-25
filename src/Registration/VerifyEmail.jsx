import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

const API = "http://localhost:8081/api/v1/auth";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email =
    location.state?.email || sessionStorage.getItem("pendingEmail") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(60);

  useEffect(() => {
    if (email) sessionStorage.setItem("pendingEmail", email);
  }, [email]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const readJson = async (response) => {
    try {
      return await response.json();
    } catch {
      return {};
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await readJson(response);
      if (!response.ok) throw new Error(data.message || "Verification failed");

      sessionStorage.removeItem("pendingEmail");
      navigate("/login", { state: { verified: true, email } });
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot reach the server."
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    try {
      const response = await fetch(`${API}/resend-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await readJson(response);
      if (!response.ok)
        throw new Error(data.message || "Could not resend code");
      setInfo("A new code was sent. Check your inbox and spam folder.");
      setCooldown(60);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!email) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#F8F9FB]">
        <p className="text-lg">
          No email to verify.{" "}
          <Link to="/register" className="text-[#00C9A7] underline">
            Go to register
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#F8F9FB]">
      <div className="w-full max-w-[500px] border-2 rounded-3xl shadow-lg py-10 px-10 bg-white">
        <h1 className="font-serif text-4xl">Verify your email</h1>
        <p className="text-base text-black/60 tracking-wider py-2">
          We sent a 6-digit code to <b>{email}</b>. It expires in 10 minutes.
        </p>

        <form className="flex flex-col gap-4 mt-3" onSubmit={handleVerify}>
          <TextField
            fullWidth
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            inputProps={{
              inputMode: "numeric",
              style: {
                letterSpacing: "0.5em",
                textAlign: "center",
                fontSize: "1.5rem",
              },
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="border-[#00C9A7] border-2 px-4 py-2 rounded-3xl text-black bg-[#00C9A7] font-semibold font-serif text-lg disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          {error && <Alert severity="error">{error}</Alert>}
          {info && <Alert severity="success">{info}</Alert>}
        </form>

        <p className="text-center text-black/60 text-lg mt-4">
          Didn't get it?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className="font-medium font-serif text-[#00C9A7] underline disabled:opacity-50 disabled:no-underline"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
