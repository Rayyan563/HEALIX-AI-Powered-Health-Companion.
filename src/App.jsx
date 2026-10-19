import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from './Homepage/Hero'
import Register_page from './Registration/Register_page';
import LoginPage from './Registration/LoginPage';
import { Home } from 'lucide-react';
import Healix_Home from './Home/Healix_Home';
import OnboardingSteps from './Registration/OnboardingSteps'
import Dashboard from './Dashboard';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/register" element={<Register_page />} />
          <Route path="/onboarding" element={<OnboardingSteps />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Healix_Home" element={<Healix_Home />} />

          <Route path="/Healix_Home" element={<Healix_Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route
            path="/HealthAssesment"
            element={<div>this page is in progress</div>}
          />
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
          <Route path="/get-started" element={<Healix_Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
