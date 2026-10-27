import Navbar_main from "../Navbar_main";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const AssesmentHeader = (props) => {
  return (
    <div className="pb-5">
      <span className="inline-flex items-center rounded-full border border-[#00C9A7] bg-[#00C9A7]/10 px-3 py-1 font-medium tracking-wide text-[#00A98D]">
        {props.highlight}
      </span>
      <h1 className="mt-3 font-serif text-4xl text-[#0B1930]">
        {props.mainHeading}
      </h1>
      <p className="mt-3 text-lg leading-6 text-slate-500">{props.info}</p>
    </div>
  );
};

const HealixAssesment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [prediction, setPrediction] = useState(null);
const [apiError, setApiError] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
  const steps = ["Symptoms", "Medical History", "Lifestyle", "Primary Concerns"];

  const [symptoms, setSymptoms] = useState([
    "Headache", "Fatigue", "Chest Pain", "Shortness of Breath", "Dizziness",
    "Nausea", "Joint Pain", "Back Pain", "Insomnia", "Anxiety", "Skin Issues",
    "Digestive Problems",
  ]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [formData, setFormData] = useState({
    symptoms: [],
    symptomsSeverity: "",
    symptomsDuration: "",
    additionalSymptoms: "",
    preExistingConditions: [],
    familyHealthHistory: [],
    currentMedications: "",
    knownAllergies: "",
    activityLevel: "",
    sleepDuration: "",
    stressLevel: "",
    primaryHealthConcern: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field, item, noneLabel = "None") => {
    setFormData((prev) => {
      const current = prev[field];
      if (item === noneLabel) {
        return { ...prev, [field]: current.includes(noneLabel) ? [] : [noneLabel] };
      }
      const withoutNone = current.filter((value) => value !== noneLabel);
      const updated = withoutNone.includes(item)
        ? withoutNone.filter((value) => value !== item)
        : [...withoutNone, item];
      return { ...prev, [field]: updated };
    });
  };


const handleNext = async (e) => {
  e.preventDefault();

  if (currentStep < 4) {
    setCurrentStep((prev) => prev + 1);
    return;
  }

  setIsSubmitting(true);
  setApiError("");
  setPrediction(null);

  const symptomMap = {
    "Headache": "headache",
    "Fatigue": "fatigue",
    "Chest Pain": "sharp chest pain",
    "Shortness of Breath": "shortness of breath",
    "Dizziness": "dizziness",
    "Nausea": "nausea",
    "Joint Pain": "joint pain",
    "Back Pain": "back pain",
    "Insomnia": "insomnia",
    "Anxiety": "anxiety and nervousness",
  };

  const selectedSymptoms = formData.symptoms
    .map((symptom) => symptomMap[symptom])
    .filter(Boolean);

  if (selectedSymptoms.length === 0) {
    setApiError(
      "Please select at least one supported symptom before submitting."
    );
    setIsSubmitting(false);
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symptoms: [...new Set(selectedSymptoms)],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        typeof data.detail === "string"
          ? data.detail
          : JSON.stringify(data.detail)
      );
    }

    setPrediction(data);
  } catch (error) {
    setApiError(
      error.message || "Could not connect to the Python API."
    );
  } finally {
    setIsSubmitting(false);
  }
};


  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleAddSymptom = () => {
    const symptom = customSymptom.trim();
    if (!symptom) return;
    const existing = symptoms.find((item) => item.toLowerCase() === symptom.toLowerCase());
    const finalSymptom = existing || symptom;
    if (!existing) setSymptoms((prev) => [...prev, symptom]);
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(finalSymptom)
        ? prev.symptoms
        : [...prev.symptoms, finalSymptom],
    }));
    setCustomSymptom("");
  };

  const progress = (currentStep / steps.length) * 100;

  const renderFooter = ({ onContinue = handleNext, continueLabel = "Continue ⟶", showBack = true } = {}) => (
    <div className="flex justify-between items-center mt-8">
      <button
        type="button"
        onClick={() => navigate("/Healix_Home")}
        className="text-base text-black/60 tracking-wider font-serif py-2"
      >
        Save &amp; Exit
      </button>
      <div className="flex gap-3">
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2 rounded-full border border-slate-200 text-sm font-medium bg-white text-slate-700 hover:border-[#00C9A7] transition-colors"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          onClick={onContinue === handleNext ? undefined : onContinue}
          className="px-5 py-2 rounded-full border border-[#00C9A7] bg-[#00C9A7] text-sm font-semibold text-black hover:bg-[#00b899] transition-colors"
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="sticky top-0 z-50 w-full">
        <Navbar_main />
      </div>

      <div className="w-full px-6 md:px-16 lg:px-48 pt-5">
        <div className="w-full px-0 py-1">
          <div className="flex items-center justify-between px-0 mb-2">
            <span className="text-lg text-gray-500">Setup Progress</span>
            <span className="text-lg font-semibold text-teal-500">Step {currentStep} of {steps.length}</span>
          </div>
          <div className="h-[4px] w-full bg-gray-200">
            <div className="h-full bg-teal-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="grid grid-cols-4 gap-2 pt-2">
            {steps.map((step, index) => (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(index + 1)}
                className={`text-left text-base transition-colors ${currentStep === index + 1 ? "text-slate-900 font-medium" : "text-slate-500"}`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto mt-10 border border-slate-200 rounded-2xl shadow-lg py-6 px-6 md:px-10 mb-10">
        {currentStep === 1 ? (
          <AssesmentHeader highlight="Symptom Check" mainHeading="What symptoms are you experiencing?" info="Please select all that apply. This helps our intelligence match parameters correctly." />
        ) : currentStep === 2 ? (
          <AssesmentHeader highlight="Medical Background" mainHeading="Your Medical History" info="Sharing diagnosed conditions or genetic histories allows custom mapping algorithms to yield safe assessments." />
        ) : currentStep === 3 ? (
          <AssesmentHeader highlight="Lifestyle Profile" mainHeading="Lifestyle & Health Habits" info="Customizing activity limits, physical factors, and daily sleep baseline metrics." />
        ) : (
          <AssesmentHeader highlight="Final Step" mainHeading="Review Your Assessment" info="Please confirm your choices below before submitting for HEALIX medical intelligence analysis." />
        )}

        {currentStep === 1 && (
          <form onSubmit={handleNext}>
            <div className="w-full flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((item) => (
                    <button key={item} type="button" onClick={() => toggleArrayValue("symptoms", item, "__none__")} className={`flex flex-row items-center gap-2 rounded-full border px-4 py-2 transition-colors ${formData.symptoms.includes(item) ? "bg-[#00C9A7] border-[#00C9A7] text-black" : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"}`}>
                      {formData.symptoms.includes(item) ? <span>●</span> : null}{item}
                    </button>
                  ))}
                </div>
                <div>
                  <h3 className="text-base mb-2 text-black/80 font-semibold font-serif">Add your own symptom</h3>
                  <p className="tracking-wider leading-5 text-black/60">If you don’t see your symptom listed, add it here. You can also use this section for symptoms that are hard to describe or not listed above.</p>
                </div>
                <div className="flex w-auto gap-3">
                  <TextField
                    size="medium"
                    fullWidth
                    placeholder="Type a symptom"
                    name="customSymptom"
                    value={customSymptom}
                    onChange={(e) => setCustomSymptom(e.target.value)}
                    sx={{ flex: 1, "& .MuiOutlinedInput-root": { height: "45px", borderRadius: "10px", "&.Mui-focused fieldset": { borderColor: "#00C9A7" }, "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(0, 201, 167, 0.15)" } } }}
                  />
                  <button onClick={handleAddSymptom} type="button" className="px-5 py-2 rounded-full border border-[#00C9A7] bg-[#00C9A7] text-sm font-semibold text-black hover:bg-[#00b899] transition-colors">Add symptom</button>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base mb-2 text-black/80 font-semibold font-serif">Symptom Severity</label>
                  <div className="w-full flex gap-2">
                    {["Mild", "Moderate", "Severe"].map((item) => (
                      <button key={item} type="button" onClick={() => updateField("symptomsSeverity", item)} className={`w-1/3 h-[50px] justify-center items-center rounded-xl border text-lg font-medium transition-colors duration-200 ${formData.symptomsSeverity === item ? "bg-[#00C9A7]/20 border-[#00C9A7] text-[#00A98D]" : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"}`}>{item}</button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base mb-2 text-black/80 font-semibold font-serif">How long have you felt these symptoms?</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Less than a week", "1-4 weeks", "1-3 months", "More than 3 months"].map((item) => (
                      <button key={item} type="button" onClick={() => updateField("symptomsDuration", item)} className={`flex flex-row items-center gap-2 rounded-full border px-4 py-2 transition-colors ${formData.symptomsDuration === item ? "bg-[#00C9A7]/20 border-[#00C9A7] text-[#00A98D]" : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"}`}>{item}</button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="additionalSymptoms" className="text-base mb-2 text-black/80 font-semibold font-serif">Additional symptoms&nbsp;&nbsp;<span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-sm font-medium text-slate-500">Optional</span></label>
                  <textarea id="additionalSymptoms" name="additionalSymptoms" value={formData.additionalSymptoms} onChange={(e) => updateField("additionalSymptoms", e.target.value)} rows={4} placeholder={'Describe any symptoms not listed above, including when they started, how often they happen, and any patterns you\'ve noticed.\n\nExample: "Sharp pain in my lower back after standing for more than 30 minutes."'} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 leading-6 text-slate-700 placeholder:text-black/40 focus:border-[#00C9A7] focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/15 transition-all" />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <button type="button" className="text-base text-black/60 tracking-wider font-serif py-2" onClick={() => navigate("/Healix_Home")}>Skip Assessment</button>
                  <div className="flex gap-3">
                    <button type="button" onClick={handleBack} className="px-5 py-2 rounded-full border border-slate-200 text-sm font-medium bg-white text-slate-700 hover:border-[#00C9A7] transition-colors">Back</button>
                    <button type="submit" className="px-5 py-2 rounded-full border border-[#00C9A7] bg-[#00C9A7] text-sm font-semibold text-black hover:bg-[#00b899] transition-colors">Continue ⟶</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleNext} className="flex flex-col gap-5">
            <div>
              <h3 className="text-base mb-2 text-black/80 font-semibold font-serif">Pre-Existing Conditions</h3>
              <div className="flex flex-col gap-2">
                {["Hypertension", "Asthma", "High Cholesterol", "Hypothyroidism", "None of these"].map((item) => {
                  const selected = formData.preExistingConditions.includes(item);
                  return (
                    <label key={item} className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-slate-700 cursor-pointer transition-colors ${selected ? "border-[#00C9A7] bg-[#00C9A7]/5" : "border-slate-200 hover:border-[#00C9A7]"}`}>
                      <input type="checkbox" checked={selected} onChange={() => toggleArrayValue("preExistingConditions", item, "None of these")} className="accent-[#00C9A7]" />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-base mb-2 text-black/80 font-semibold font-serif">Family Health History</h3>
              <div className="flex flex-wrap gap-2">
                {["Heart Disease", "Diabetes", "Cancer", "Hypertension", "None"].map((item) => (
                  <button key={item} type="button" onClick={() => toggleArrayValue("familyHealthHistory", item, "None")} className={`flex flex-row items-center gap-2 rounded-full border px-4 py-2 transition-colors ${formData.familyHealthHistory.includes(item) ? "bg-[#00C9A7]/20 border-[#00C9A7] text-[#00A98D]" : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"}`}>
                    {formData.familyHealthHistory.includes(item) ? <span>●</span> : null}{item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="currentMedications" className="text-base text-black/80 font-semibold font-serif">Current Medications</label>
              <input id="currentMedications" value={formData.currentMedications} onChange={(e) => updateField("currentMedications", e.target.value)} placeholder="e.g. Multivitamins, Ibuprofen occasionally..." className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 leading-6 text-slate-700 placeholder:text-black/40 focus:border-[#00C9A7] focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/15 transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="knownAllergies" className="text-base text-black/80 font-semibold font-serif">Known Allergies (Optional)</label>
              <input id="knownAllergies" value={formData.knownAllergies} onChange={(e) => updateField("knownAllergies", e.target.value)} placeholder="e.g. Penicillin, Pollen, Peanuts..." className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 leading-6 text-slate-700 placeholder:text-black/40 focus:border-[#00C9A7] focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/15 transition-all" />
            </div>
            <div className="flex justify-between items-center mt-3">
              <button type="button" onClick={() => navigate("/Healix_Home")} className="text-base text-black/60 tracking-wider font-serif py-2">Save &amp; Exit</button>
              <div className="flex gap-3">
                <button type="button" onClick={handleBack} className="px-5 py-2 rounded-full border border-slate-200 text-sm font-medium bg-white text-slate-700 hover:border-[#00C9A7] transition-colors">Back</button>
                <button type="submit" className="px-5 py-2 rounded-full border border-[#00C9A7] bg-[#00C9A7] text-sm font-semibold text-black hover:bg-[#00b899] transition-colors">Continue ⟶</button>
              </div>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleNext} className="flex flex-col gap-6">
            <div>
              <h3 className="text-base mb-2 text-black/80 font-semibold font-serif">Physical Activity Level</h3>
              <div className="flex flex-col gap-2">
                {["Sedentary (Little to no exercise)", "Lightly Active (1-2 days/week)", "Moderately Active (3-5 days/week)", "Very Active (6-7 days/week)"].map((item) => (
                  <button key={item} type="button" onClick={() => updateField("activityLevel", item)} className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors ${formData.activityLevel === item ? "border-[#00C9A7] bg-[#00C9A7]/5 text-slate-700" : "border-slate-200 bg-white text-slate-700 hover:border-[#00C9A7]"}`}>
                    <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${formData.activityLevel === item ? "border-[#00C9A7]" : "border-slate-400"}`}>{formData.activityLevel === item && <span className="h-2 w-2 rounded-full bg-[#00C9A7]" />}</span>{item}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base mb-3 text-black/80 font-semibold font-serif">Sleep Duration</h3>
                <div className="flex flex-wrap gap-2">
                  {["< 6 hours", "6-8 hours", "8+ hours"].map((item) => (
                    <button key={item} type="button" onClick={() => updateField("sleepDuration", item)} className={`flex flex-row items-center gap-2 rounded-full border px-4 py-2 transition-colors ${formData.sleepDuration === item ? "bg-[#00C9A7]/20 border-[#00C9A7] text-[#00A98D]" : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"}`}>
                      {formData.sleepDuration === item ? <span>●</span> : null}{item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base mb-3 text-black/80 font-semibold font-serif">Current Stress Levels</h3>
                <div className="flex flex-wrap gap-2">
                  {["Low", "Medium", "High"].map((item) => (
                    <button key={item} type="button" onClick={() => updateField("stressLevel", item)} className={`flex flex-row items-center gap-2 rounded-full border px-4 py-2 transition-colors ${formData.stressLevel === item ? "bg-[#00C9A7]/20 border-[#00C9A7] text-[#00A98D]" : "bg-white border-slate-200 text-slate-700 hover:border-[#00C9A7]"}`}>
                      {formData.stressLevel === item ? <span>●</span> : null}{item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="primaryHealthConcern" className="text-base text-black/80 font-semibold font-serif">What is your primary health concern today? (Optional)</label>
              <textarea id="primaryHealthConcern" value={formData.primaryHealthConcern} onChange={(e) => updateField("primaryHealthConcern", e.target.value)} rows={4} placeholder="e.g. Seeking diagnostic options for chronic migraine tracking and exploring local treatment providers..." className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 leading-6 text-slate-700 placeholder:text-black/40 focus:border-[#00C9A7] focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/15 transition-all" />
            </div>
            <div className="flex justify-between items-center mt-3">
              <button type="button" onClick={() => navigate("/Healix_Home")} className="text-base text-black/60 tracking-wider font-serif py-2">Save &amp; Exit</button>
              <div className="flex gap-3">
                <button type="button" onClick={handleBack} className="px-5 py-2 rounded-full border border-slate-200 text-sm font-medium bg-white text-slate-700 hover:border-[#00C9A7] transition-colors">Back</button>
                <button type="submit" className="px-5 py-2 rounded-full border border-[#00C9A7] bg-[#00C9A7] text-sm font-semibold text-black hover:bg-[#00b899] transition-colors">Continue ⟶</button>
              </div>
            </div>
          </form>
        )}

        {currentStep === 4 && (
          <form onSubmit={handleNext} className="flex flex-col gap-4">
            <ReviewSection title="Symptoms" onEdit={() => setCurrentStep(1)}>
              <ReviewItem label="Selected Symptoms" value={formData.symptoms.length ? formData.symptoms.join(", ") : "None selected"} />
              <ReviewItem label="Severity" value={formData.symptomsSeverity || "Not specified"} />
              <ReviewItem label="Duration" value={formData.symptomsDuration || "Not specified"} />
              {formData.additionalSymptoms && <ReviewItem label="Additional Symptoms" value={formData.additionalSymptoms} />}
            </ReviewSection>
            <ReviewSection title="Medical History" onEdit={() => setCurrentStep(2)}>
              <ReviewItem label="Pre-existing Conditions" value={formData.preExistingConditions.length ? formData.preExistingConditions.join(", ") : "None reported"} />
              <ReviewItem label="Family Medical History" value={formData.familyHealthHistory.length ? formData.familyHealthHistory.join(", ") : "None reported"} />
              <ReviewItem label="Daily Medications" value={formData.currentMedications || "None reported"} />
              <ReviewItem label="Known Allergies" value={formData.knownAllergies || "None reported"} />
            </ReviewSection>
            <ReviewSection title="Lifestyle & Concerns" onEdit={() => setCurrentStep(3)}>
              <ReviewItem label="Physical Activity" value={formData.activityLevel || "Not specified"} />
              <ReviewItem label="Daily Sleep / Stress" value={`${formData.sleepDuration || "Not specified"} · ${formData.stressLevel || "Not specified"} stress`} />
              <ReviewItem label="Primary Health Concern" value={formData.primaryHealthConcern || "None reported"} />
            </ReviewSection>
            <div className="flex justify-between items-center mt-5">
              <button type="button" onClick={() => navigate("/Healix_Home")} className="text-base text-black/60 tracking-wider font-serif py-2">Save &amp; Exit</button>
              <div className="flex gap-3">
                <button type="button" onClick={handleBack} className="px-5 py-2 rounded-full border border-slate-200 text-sm font-medium bg-white text-slate-700 hover:border-[#00C9A7] transition-colors">Back</button>
                <button type="submit" className="px-5 py-2 rounded-full border border-[#00C9A7] bg-[#00C9A7] text-sm font-semibold text-black hover:bg-[#00b899] transition-colors">Submit Assessment ⟶</button>
              </div>
            </div>
          </form>
        )}
          
            {(isSubmitting) && (
              <p className="mt-4 text-teal-600 font-medium">
                Analyzing your symptoms...
              </p>
            )}

            {apiError && (
              <p className="mt-4 text-red-600" role="alert">
                {apiError}
              </p>
            )}

            {prediction && (
              <div className="mt-6 rounded-xl border border-teal-200 p-5">
                <h2 className="text-xl font-semibold text-[#0B1930]">
                  Prediction Results
                </h2>

                <div className="mt-4 flex flex-col gap-3">
                  {prediction.predictions.map((item) => (
                    <div
                      key={item.condition}
                      className="rounded-lg bg-slate-50 p-3"
                    >
                      <p className="font-medium text-slate-800">
                        {item.condition}
                      </p>
                      <p className="text-sm text-slate-600">
                        Model score: {item.model_score_percent}%
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  {prediction.disclaimer}
                </p>
              </div>
            )}

      </div>
    </div>
  );
};

const ReviewSection = ({ title, onEdit, children }) => (
  <section className="border border-slate-200 rounded-xl px-4 py-4">
    <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
      <h2 className="font-serif text-xl text-[#0B1930]">{title}</h2>
      <button type="button" onClick={onEdit} className="text-sm font-semibold text-[#00A98D] hover:underline">Edit</button>
    </div>
    <div className="flex flex-col gap-3">{children}</div>
  </section>
);

const ReviewItem = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase font-semibold tracking-wide text-slate-500 mb-1">
      {label}
    </p>
    <p className="text-sm text-[#0B1930] font-semibold whitespace-pre-wrap break-words">
      {value}
    </p>
  </div>
);

export default HealixAssesment;
