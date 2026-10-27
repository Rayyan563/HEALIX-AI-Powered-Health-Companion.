import { useEffect, useState,useRef } from "react";
export function Hero_header_steps(props){
  return (
    <div className="hiw-header w-11/12 h-24 flex flex-col justify-center items-center">
      <p className="text-lg text-[#00C9A7] font-sans font-medium">{props.minheading}</p>
      <h1 className="text-6xl font-serif text-center w-[1200px] p-5">{props.mainHeader}</h1>
    </div>
  );
}
 export function Hiw_steps(props){
    return (
      <div
        className={`h-[500px] w-[30%] flex flex-col justify-center p-5 gap-5 transition-all duration-[1000ms] ${
          props.startAnimation
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        style={{
          transitionDelay: `${(props.stepNum - 1) * 500}ms`,
        }}
      >
        <div className="w-10 h-10 rounded-full bg-[#E8F9F7] flex items-center justify-center">
          <span className="text-[#0cded3] text-xl font-semibold">
            {props.stepNum}
          </span>
        </div>
        <div>
          <h2 className="text-3xl font-serif w-full">{props.header}</h2>
          <p className="leading-6 text-black/60 mt-5">{props.info}</p>
        </div>
        <div className="w-full h-[35%] flex flex-col py-3 border-2 bg-[#F8F9FB] rounded-2xl justify-between bg-black/5">
          <div className="w-full flex px-5 gap-3">
            <i className="fa-solid fa-wand-magic-sparkles text-sm text-[#00C9A7]"></i>
            <p className="text-sm font-semibold">{props.ai}</p>
          </div>
          <div className="w-full flex px-5 justify-between">
            <p className="font-serif text-black/80">{props.aiWork}</p>
            <i className="fa-solid fa-arrow-right text-sm text-[#00C9A7]"></i>
          </div>
        </div>
      </div>
    );
  };
const Hero_how_works = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        console.log("how works visible");
        setStartAnimation(true);
      }
    });

    observer.observe(section);

    return () => observer.disconnect();
  }, []);
  return (
    <div
      id="how-it-works"
      className="how-works w-screen h-[650px] flex flex-col bg-white items-center justify-center pt-16 "
    >
      <Hero_header_steps minheading="PROCESS" mainHeader="How It Works" />
      <div
        className="hiw-steps-row flex flex-row justify-between items-center w-full px-16 "
        ref={sectionRef}
      >
        <Hiw_steps
          stepNum="1"
          startAnimation={startAnimation}
          header="Describe Your Symptoms"
          info="Tell us what you're experiencing in your own words. No medical jargon required."
          ai="Symptom input"
          aiWork="Type symptoms here..."
        />
        <Hiw_steps
          stepNum="2"
          startAnimation={startAnimation}
          header="Get AI-Powered Insights"
          info="Our AI analyzes your input and identifies potential health considerations."
          ai="HEALIX Engine"
          aiWork="Analyzing 4 parameters..."
        />
        <Hiw_steps
          stepNum="3"
          startAnimation={startAnimation}
          header="Find Care & Costs"
          info="Discover nearby clinics, doctors, and get approximate procedure cost estimates."
          ai="Location mapping"
          aiWork="24 local clinics found"
        />
      </div>
    </div>
  );
}
export default Hero_how_works