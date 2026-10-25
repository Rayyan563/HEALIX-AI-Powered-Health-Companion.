import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Alert from "@mui/material/Alert";

const GoogleAuthButton = ({ mode = "login" }) => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const googleReady = useRef(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) {
      setError("Google Client ID is missing from your frontend .env file.");
      return;
    }

    let cancelled = false;
    let script = document.getElementById("google-identity-services");

    const initializeGoogle = () => {
      if (cancelled || !buttonRef.current || !window.google?.accounts?.id) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,

        callback: async (googleResponse) => {
          if (!googleResponse.credential) {
            setError("Google authentication failed. Please try again.");
            return;
          }

          setError("");
          setLoading(true);

          try {
            const response = await fetch(
              "http://localhost:8081/api/v1/auth/google",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  credential: googleResponse.credential,
                }),
              },
            );

            let data = {};

            try {
              data = await response.json();
            } catch {
              data = {};
            }

            if (!response.ok) {
              throw new Error(
                data.message || data.detail || "Google authentication failed.",
              );
            }

            if (!data.token) {
              throw new Error("Authentication token was not returned.");
            }

            localStorage.setItem("token", data.token);

            localStorage.setItem(
              "user",
              JSON.stringify({
                userId: data.userId,
                fullName: data.fullName,
                email: data.email,
                onboardingStatus: data.onboardingStatus || "PENDING",
              }),
            );

            navigate(
              data.onboardingStatus === "PENDING"
                ? "/onboarding"
                : "/Healix_Home",
              { replace: true },
            );
          } catch (err) {
            setError(
              err.message === "Failed to fetch"
                ? "Cannot connect to the backend on port 8081."
                : err.message,
            );
          } finally {
            setLoading(false);
          }
        },
      });

      buttonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: mode === "signup" ? "signup_with" : "continue_with",
        shape: "pill",
        width: buttonRef.current.parentElement.offsetWidth,
        logo_alignment: "left",
      });

      googleReady.current = true;
    };

    if (window.google?.accounts?.id) {
      initializeGoogle();
    } else if (!script) {
      script = document.createElement("script");
      script.id = "google-identity-services";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      script.onerror = () => {
        if (!cancelled) {
          setError(
            "Unable to load Google sign-in. Check your internet connection.",
          );
        }
      };

      document.head.appendChild(script);
    } else {
      script.addEventListener("load", initializeGoogle);
    }

    return () => {
      cancelled = true;
      googleReady.current = false;
      script?.removeEventListener("load", initializeGoogle);
    };
  }, [clientId, mode, navigate]);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <button
          type="button"
          disabled={loading}
          className="w-full border-black/10 border-2 text-black px-4 py-2 rounded-3xl font-semibold font-serif transition-transform duration-500 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <FcGoogle className="text-xl" />

          {loading
            ? "Signing in with Google..."
            : mode === "signup"
              ? "Signup with Google"
              : "Continue with Google"}
        </button>

        {!loading && (
          <div
            ref={buttonRef}
            className="absolute inset-0 z-10 overflow-hidden opacity-0"
            aria-label="Google sign-in"
          />
        )}
      </div>

      {error && (
        <Alert severity="error" className="mt-3">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default GoogleAuthButton;
