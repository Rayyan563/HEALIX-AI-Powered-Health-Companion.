import { useState, useEffect } from "react";
import Onboarding_navbar from "./Onboarding_navbar";
import Onboarding_header from "./Onboarding_header";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { updateOnboardingStatus } from "../utils/onboarding";
const OnboardingSteps = () => {
  const navigate = useNavigate();
    useEffect(() => {
      if (!localStorage.getItem("token")) navigate("/login");
    }, [navigate]);

    const finishOnboarding = async (status) => {
      try {
        await updateOnboardingStatus(status);
      } catch (err) {
        if (err.message === "UNAUTHORIZED") {
          navigate("/login");
          return;
        }
        console.error(err);
      }
      sessionStorage.removeItem("onboardingStep");
      navigate("/Healix_Home");
    };

    const handleSkip = () => finishOnboarding("SKIPPED");
  const [currentStep, setCurrentStep] = useState(() => {
    return Number(sessionStorage.getItem("onboardingStep")) || 1;
  });
  useEffect(() => {
    sessionStorage.setItem("onboardingStep", currentStep);
  }, [currentStep]);
  const medicalHistory = [
    "None",
    "Hypertension",
    "Diabetes",
    "Asthma",
    "Heart Disease",
    "Migraine",
    "Allergies",
    "Thyroid Disorder",
  ];
  const healthConcern = [
    "None",
    "Fatigue",
    "Chronic Headaches",
    "Joint Pain",
    "Digestive Issues",
    "Anxiety",
    "Poor Sleep",
    "Weight Management",
    "Muscle Tension",
  ];
  const [formData, setFormData] = useState({
    age: "",
    gender: "Female",
    height: "",
    weight: "",
    medicalHistory: ["None"],
    dailyMedication: "",
    activityLevel: "",
    sleepQuality: "",
    healthConcern: ["None"],
    additionalConcern: "",
  });
  const activityOptions = [
    {
      title: "Sedentary",
      description: "Desk job, little regular physical movement.",
    },
    {
      title: "Lightly Active",
      description: "Light workouts or walking 1-3 days/wk.",
    },
    {
      title: "Very Active",
      description: "Intense athletic training 5+ days/wk.",
    },
  ];
  const sleepQuality = [
    {
      title: "Poor Sleep",
      description: "Frequent waking, restless nights.",
    },
    {
      title: "Fair / Moderate",
      description: "6-7 hours with occasional disruption.",
    },
    {
      title: "Excellent Sleep",
      description: "Deep, restorative 8+ hours.",
    },
  ];
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
    const handleNext = async (e) => {
      e.preventDefault();
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
        return;
      }
      await finishOnboarding("COMPLETED");
    };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const handleConditionChange = (item) => {
    setFormData((prev) => {
      let updated;

      if (item === "None") {
        updated = ["None"];
      } else {
        updated = prev.medicalHistory.filter(
          (condition) => condition !== "None",
        );

        if (updated.includes(item)) {
          updated = updated.filter((condition) => condition !== item);
        } else {
          updated = [...updated, item];
        }
      }
      return {
        ...prev,
        medicalHistory: updated,
      };
    });
  };
  const healthConcernChange = (item) => {
    setFormData((prev) => {
      let updated;

      if (item === "None") {
        updated = ["None"];
      } else {
        updated = prev.healthConcern.filter(
          (condition) => condition !== "None",
        );

        if (updated.includes(item)) {
          updated = updated.filter((condition) => condition !== item);
        } else {
          updated = [...updated, item];
        }
      }
      return {
        ...prev,
        healthConcern: updated,
      };
    });
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-8">
      <div className="fixed top-0">
        <Onboarding_navbar />
      </div>
      {currentStep === 1 ? (
        <Onboarding_header
          header="Tell us about yourself"
          info="Let's customize your experience to deliver accurate symptom checking and health advice."
        />
      ) : currentStep === 2 ? (
        <Onboarding_header
          header="Your Medical History"
          info="Select any pre-existing health issues to help our AI contextualize analysis safely."
        />
      ) : currentStep === 3 ? (
        <Onboarding_header
          header="Daily Habits & Lifestyle"
          info="Daily activity levels and sleep hygiene directly correlate with physical symptom thresholds."
        />
      ) : (
        <Onboarding_header
          header="Primary Health Concerns"
          info="Select what you are most interested in tracking or understanding."
        />
      )}
      <div className="border-2 rounded-2xl shadow-lg py-5 px-10">
        {currentStep === 1 && (
          <form onSubmit={handleNext}>
            <div className="flex gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-base mb-2 text-black/60 font-semibold font-serif">
                    Age<span className="text-red-500">*</span>
                  </label>
                  <TextField
                    required
                    placeholder="e.g. 28"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-base mb-2 text-black/60 font-semibold font-serif">
                    Height<span className="text-red-500">*</span>
                  </label>
                  <TextField
                    required
                    placeholder="e.g. 175 cm"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className=" flex flex-col gap-1">
                  <label className="text-base mb-2 text-black/60 font-semibold font-serif">
                    Gender<span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {["Female", "Male", "Other"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            gender: item,
                          }))
                        }
                        className={`px-5 py-3 rounded-xl border text-lg font-medium transition-colors duration-200 ${
                          formData.gender === item
                            ? "bg-[#00C9A7] border-[#00C9A7] text-black"
                            : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-base mb-2 text-black/60 font-semibold font-serif">
                    Weight<span className="text-red-500">*</span>
                  </label>
                  <TextField
                    required
                    placeholder="e.g. 70 kg"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <button
                className="text-base text-black/60 tracking-wider font-serif py-2"
                onClick={handleSkip}
              >
                Skip Setup
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2 rounded-full border border-slate-200
                text-sm font-medium bg-white text-slate-700
                hover:border-[#00C9A7] transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full border border-[#00C9A7]
                   bg-[#00C9A7] text-sm font-semibold text-black
                   hover:bg-[#00b899] transition-colors"
                >
                  Next Step ⟶
                </button>
              </div>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleNext}>
            <div className="w-[650px] max-w-[95vw] flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <label className="text-base font-semibold text-black font-serif">
                  Do you have any existing health conditions?
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {medicalHistory.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleConditionChange(item)}
                      className={`flex flex-row items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
                        formData.medicalHistory.includes(item)
                          ? "bg-[#00C9A7] border-[#00C9A7] text-black"
                          : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"
                      }`}
                    >
                      {/* <span>●</span> */}
                      {formData.medicalHistory.includes(item) ? (
                        <span>●</span>
                      ) : (
                        ""
                      )}
                      {item}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-base font-semibold text-black/60 font-serif">
                    Are you currently taking any daily medications?
                  </label>
                  <input
                    name="dailyMedication"
                    value={formData.dailyMedication}
                    onChange={handleChange}
                    type="text"
                    placeholder="Albuterol inhaler (as needed)"
                    className="outline-none rounded-full border px-4 py-2 transition-colors bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <button
                className="text-base text-black/60 tracking-wider font-serif py-2"
                onClick={handleSkip}
              >
                Skip Setup
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2 rounded-full border border-slate-200
                text-sm font-medium bg-white text-slate-700
                hover:border-[#00C9A7] transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full border border-[#00C9A7]
                   bg-[#00C9A7] text-sm font-semibold text-black
                   hover:bg-[#00b899] transition-colors"
                >
                  Next Step ⟶
                </button>
              </div>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleNext}>
            <div className="flex gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-base font-semibold text-black/60 font-serif">
                  Activity Level
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  {activityOptions.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          activityLevel: item.title,
                        }))
                      }
                      className={`px-5 py-3 rounded-xl border text-lg font-medium transition-colors duration-200 ${
                        formData.activityLevel === item.title
                          ? "bg-[#00C9A7] border-[#00C9A7] text-black"
                          : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"
                      }`}
                    >
                      <p className="font-semibold font-serif text-black">
                        {item.title}
                      </p>
                      <p className="text-sm mt-1 text-black/60">
                        {item.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-base font-semibold text-black/60 font-serif">
                  Avg Sleep Quality
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  {sleepQuality.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          sleepQuality: item.title,
                        }))
                      }
                      className={`px-5 py-3 rounded-xl border text-lg font-medium transition-colors duration-200 ${
                        formData.sleepQuality === item.title
                          ? "bg-[#00C9A7] border-[#00C9A7] text-black"
                          : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"
                      }`}
                    >
                      <p className="font-semibold font-serif text-black">
                        {item.title}
                      </p>
                      <p className="text-sm mt-1 text-black/60">
                        {item.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <button
                className="text-base text-black/60 tracking-wider font-serif py-2"
                onClick={handleSkip}
              >
                Skip Setup
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2 rounded-full border border-slate-200
                text-sm font-medium bg-white text-slate-700
                hover:border-[#00C9A7] transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full border border-[#00C9A7]
                   bg-[#00C9A7] text-sm font-semibold text-black
                   hover:bg-[#00b899] transition-colors"
                >
                  Next Step ⟶
                </button>
              </div>
            </div>
          </form>
        )}

        {currentStep === 4 && (
          <form onSubmit={handleNext}>
            <div className="w-[650px] max-w-[95vw] flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <label className="text-base font-semibold text-black font-serif">
                  Choose areas you want customized advice on
                  {/* <span className="text-red-500">*</span> */}
                </label>
                <div className="flex flex-wrap gap-2">
                  {healthConcern.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => healthConcernChange(item)}
                      className={`flex flex-row items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
                        formData.healthConcern.includes(item)
                          ? "bg-[#00C9A7] border-[#00C9A7] text-black"
                          : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"
                      }`}
                    >
                      {/* <span>●</span> */}
                      {formData.healthConcern.includes(item) ? (
                        <span>●</span>
                      ) : (
                        ""
                      )}
                      {item}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-base font-semibold text-black/60 font-serif">
                    Additional symptoms or historical notes (Optional)
                  </label>
                  <input
                    name="additionalConcern"
                    value={formData.additionalConcern}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g. Temple pressure occurs primarily after long coding sessions."
                    className="outline-none rounded-full border px-4 py-2 transition-colors bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <button
                className="text-base text-black/60 tracking-wider font-serif py-2"
                onClick={handleSkip}
              >
                Skip Setup
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2 rounded-full border border-slate-200
                text-sm font-medium bg-white text-slate-700
                hover:border-[#00C9A7] transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full border border-[#00C9A7]
                   bg-[#00C9A7] text-sm font-semibold text-black
                   hover:bg-[#00b899] transition-colors"
                >
                  Next Step ⟶
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default OnboardingSteps;
