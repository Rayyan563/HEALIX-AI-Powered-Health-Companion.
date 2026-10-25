import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Hero from "./Homepage/Hero";
import Register_page from "./Registration/Register_page";
import LoginPage from "./Registration/LoginPage";
import Healix_Home from "./Home/Healix_Home";
import OnboardingSteps from "./Registration/OnboardingSteps";
import Dashboard from "./Dashboard";
import HealixAssesment from "./Assesment/HealixAssesment";
import VerifyEmail from "./Registration/VerifyEmail";

function App() {
  const AssessmentRoute = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.onboardingStatus !== "COMPLETED") {
      return <Navigate to="/onboarding" replace />;
    }

    return <HealixAssesment />;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/register" element={<Register_page />} />
          <Route path="/onboarding" element={<OnboardingSteps />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/Healix_Home" element={<Healix_Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/HealthAssesment" element={<AssessmentRoute />} />
          <Route
            path="/MedicalReports"
            element={<div>this page is in progress</div>}
          />
          <Route
            path="/Guidance"
            element={<div>this page is in progress</div>}
          />
          <Route
            path="/HealthCare"
            element={<div>this page is in progress</div>}
          />
          <Route
            path="/CostEstimator"
            element={<div>this page is in progress</div>}
          />
          <Route
            path="/AskHealix"
            element={<div>this page is in progress</div>}
          />

          <Route
            path="/forgotPasswd"
            element={
              <div>tera paswword mujhe kaise pata hoga??? khud dekh nah</div>
            }
          />
          <Route
            path="/get-started"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/Healix_Home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
