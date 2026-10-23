import Navbar_main from "../Navbar_main"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
const AssesmentHeader=(props)=>{
    return (
      <div className="pb-5">
        <span className="inline-flex items-center rounded-full border border-[#00C9A7] bg-[#00C9A7]/10 px-3 py-1 font-medium tracking-wide text-[#00A98D]">
          {props.highlight}
        </span>
        <h1 className="mt-3 font-serif text-4xl text-[#0B1930]">
          {props.mainHeading}
        </h1>

        <p className="mt-3 text-lg leading-6 text-slate-500">
          {props.info}
        </p>
      </div>
    );
}
const HealixAssesment = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [
      "Symptoms",
      "Medical History",
      "Lifestyle",
      "Primary Concerns",
    ];
    const [symptoms, setSymptoms] = useState([
      "Headache",
      "Fatigue",
      "Chest Pain",
      "Shortness of Breath",
      "Dizziness",
      "Nausea",
      "Joint Pain",
      "Back Pain",
      "Insomnia",
      "Anxiety",
      "Skin Issues",
      "Digestive Problems",
    ]);
    const [customSymptom, setCustomSymptom] = useState("");
    const [formData, setFormData] = useState({
      symptoms:[],
      symptomsSeverity:"",
      symptomsDuration:"",
      additionalSymptoms:""
    });
    const handleNext = (e) => {
      e.preventDefault();
      console.log(formData);
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
      } else {
        console.log(formData);
        sessionStorage.removeItem("onboardingStep");
        // navigate("/");
      }
    };
    const handleBack = () => {
      if (currentStep > 1) {
        setCurrentStep((prev) => prev - 1);
      }
    };
    const handleConditionChange = (item) => {
      setFormData((prev) => {
        const updated = prev.symptoms.includes(item)
          ? prev.symptoms.filter((condition) => condition !== item)
          : [...prev.symptoms, item];
        return {
          ...prev,
          symptoms: updated,
        };
      });
    };
    const handleChange = (e) => {
    setCustomSymptom(e.target.value);
  };
  const handleAddSymptom = () => {
    const symptom = customSymptom.trim();

    if (!symptom) return;
    if (
      !symptoms.some((item) => item.toLowerCase() === symptom.toLowerCase())
    ) {
      setSymptoms((prev) => [...prev, symptom]);
    }
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms
        : [...prev.symptoms, symptom],
    }));

    setCustomSymptom("");
  };
    const progress = (currentStep / steps.length) * 100;
  return (
    <div>
      <div className="sticky top-0 z-50 w-full">
        <Navbar_main />
      </div>
      <div className="w-full px-48 pt-5">
        <div className="w-full px-0 py-1">
          <div className="flex items-center justify-between px-0 mb-2">
            <span className="text-lg text-gray-500">Setup Progress</span>
            <span className="text-lg font-semibold text-teal-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          <div className="h-[4px] w-full bg-gray-200">
            <div
              className="h-full bg-teal-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2">
            {steps.map((step, index) => (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(index + 1)}
                className={`text-left text-base transition-colors ${
                  currentStep === index + 1
                    ? "text-slate-900 font-medium"
                    : "text-slate-500"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto mt-10 border border-slate-200 rounded-2xl shadow-lg py-6 px-6 md:px-10 mb-10">
        {currentStep === 1 ? (
          <AssesmentHeader
            highlight="Symptom Check"
            mainHeading="What symptoms are you experiencing?"
            info="Please select all that apply. This helps our intelligence match parameters correctly."
          />
        ) : currentStep === 2 ? (
          <AssesmentHeader
            highlight="Medical Background"
            mainHeading="Your Medical History"
            info="Sharing diagnosed conditions or genetic histories allows custom mapping algorithms to yield safe assessments."
          />
        ) : currentStep === 3 ? (
          <AssesmentHeader
            highlight="Lifestyle Profile"
            mainHeading="Lifestyle & Health Habits"
            info="Customizing activity limits, physical factors, and daily sleep baseline metrics."
          />
        ) : (
          <AssesmentHeader
            highlight="Final Step"
            mainHeading="Review Your Assessment"
            info="Please confirm your choices below before submitting for HEALIX medical intelligence analysis."
          />
        )}
        {currentStep === 1 && (
          <form onSubmit={handleNext}>
            <div className="w-full  flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleConditionChange(item)}
                      className={`flex flex-row items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
                        formData.symptoms.includes(item)
                          ? "bg-[#00C9A7] border-[#00C9A7] text-black"
                          : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"
                      }`}
                    >
                      {formData.symptoms.includes(item) ? <span>●</span> : ""}
                      {item}
                    </button>
                  ))}
                </div>
                <div>
                  <h3 className="text-base mb-2 text-black/80 font-semibold font-serif">
                    Add your own symptom
                  </h3>
                  <p className="tracking-wider leading-5 text-black/60">
                    If you don’t see your symptom listed, add it here. You can
                    also use this section for symptoms that are hard to describe
                    or not listed above.
                  </p>
                </div>

                <div className="flex w-auto gap-3">
                  <TextField
                    size="medium"
                    fullWidth
                    placeholder="Type a symptom"
                    name="symptomps"
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        height: "45px",
                        borderRadius: "10px",
                        "&.Mui-focused fieldset": {
                          borderColor: "#00C9A7",
                        },
                        "&.Mui-focused": {
                          boxShadow: "0 0 0 2px rgba(0, 201, 167, 0.15)",
                        },
                      },
                    }}
                    value={customSymptom}
                    onChange={handleChange}
                  />
                  <button
                    onClick={handleAddSymptom}
                    type="button"
                    className="px-5 py-2 rounded-full border border-[#00C9A7]
                bg-[#00C9A7] text-sm font-semibold text-black
                hover:bg-[#00b899] transition-colors"
                  >
                    Add symptom
                  </button>
                </div>
                <div className=" flex flex-col gap-1">
                  <label className="text-base mb-2 text-black/80 font-semibold font-serif">
                    Symptom Severity
                  </label>
                  <div className="w-full flex gap-2">
                    {["Mild", "Moderate", "Severe"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            symptomsSeverity: item,
                          }))
                        }
                        className={`w-1/3 h-[50px] justify-center items-center rounded-xl border text-lg font-medium transition-colors duration-200 ${
                          formData.symptomsSeverity === item
                            ? "bg-[#00C9A7]/20 border-[#00C9A7] text-[#00C9A7]"
                            : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className=" flex flex-col gap-1">
                  <h3 className="text-base mb-2 text-black/80 font-semibold font-serif">
                    How long have you felt these symptoms?
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Less than a week",
                      "1-4 weeks",
                      "1-3 months",
                      "More than 3 months",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            symptomsDuration: item,
                          }))
                        }
                        className={`flex flex-row items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
                          formData.symptomsDuration === item
                            ? "bg-[#00C9A7]/20 border-[#00C9A7] text-[#00C9A7]"
                            : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="additionalSymptoms"
                    className="text-base mb-2 text-black/80 font-semibold font-serif"
                  >
                    Additional symptoms &nbsp;&nbsp;
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-sm font-medium text-slate-500">
                      Optional
                    </span>
                  </label>

                  <textarea
                    id="additionalSymptoms"
                    name="additionalSymptoms"
                    value={formData.additionalSymptoms}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        additionalSymptoms: e.target.value,
                      }))
                    }
                    rows={4}
                    placeholder={`Describe any symptoms not listed above, including when they started, how often they happen, and any patterns you've noticed.\n\nExample: "Sharp pain in my lower back after standing for more than 30 minutes."`}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 leading-6 text-slate-700 placeholder:text-black/40  focus:border-[#00C9A7] focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/15 transition-all"
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <button
                    className="text-base text-black/60 tracking-wider font-serif py-2"
                    onClick={() => navigate("/Healix_Home")}
                  >
                    Skip Assesment
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
                      Continue ⟶
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
export default HealixAssesment