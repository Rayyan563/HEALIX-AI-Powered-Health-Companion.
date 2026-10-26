import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Hero from "./Homepage/Hero";
import Register_page from "./Registration/Register_page";
import LoginPage from "./Registration/LoginPage";
import Healix_Home from "./Home/Healix_Home";
import OnboardingSteps from "./Registration/OnboardingSteps";
import Dashboard from "./Dashboard";
import HealixAssesment from "./Assesment/HealixAssesment";
import VerifyEmail from "./Registration/VerifyEmail";
import ForgotPassword from "./Registration/ForgotPassword";

function App() {
 function GetStartedRoute() {
   const [destination, setDestination] = useState(null);

   useEffect(() => {
     const checkLogin = async () => {
       const token = localStorage.getItem("token");

       // Login nahi hai
       if (!token) {
         setDestination("/login");
         return;
       }

       try {
         const response = await fetch("http://localhost:8081/api/v1/users/me", {
           method: "GET",
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });

         if (!response.ok) {
           localStorage.removeItem("token");
           localStorage.removeItem("user");
           setDestination("/login");
           return;
         }

         // Token valid hai
         const user = JSON.parse(localStorage.getItem("user") || "{}");

         setDestination(
           user.onboardingStatus === "PENDING" ? "/onboarding" : "/Healix_Home",
         );
       } catch {
         // Backend band hai ya connection fail hai
         setDestination("/login");
       }
     };

     checkLogin();
   }, []);

   if (!destination) {
     return null;
   }

   return <Navigate to={destination} replace />;
 }
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
          <Route path="/HealthAssesment" element={<HealixAssesment />} />
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

          <Route path="/forgotPasswd" element={<ForgotPassword />} />
          <Route path="/get-started" element={<GetStartedRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
