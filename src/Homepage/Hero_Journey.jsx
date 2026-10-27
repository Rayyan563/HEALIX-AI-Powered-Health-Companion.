import { useState, useEffect, useRef } from "react";
import { Hero_header_steps } from "./Hero_how_works";
import { Activity, Sparkles, MapPin, DollarSign } from "lucide-react";
export function Journey(props) {
  const Icon = props.icon;
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div
        className={`h-20 w-20 rounded-full flex items-center justify-center border-2 border-black/10 ${
          props.active ? "bg-[#00C9A7] text-white" : "bg-white text-black"
        }`}
      >
        <Icon />
      </div>
      <h2 className="text-base font-serif font-semibold">
        {props.activityName}
      </h2>
    </div>
  );
}
const Hero_Journey = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef(null);
  useEffect(()=>{
    const section=sectionRef.current;
    const observer = new IntersectionObserver((entries)=>{
      const entry=entries[0];
      if(entry.isIntersecting){
        // console.log("journey is visible
        setStartAnimation(true);
      }
    });
    observer.observe(section);
  },[])
  useEffect(()=>{
      const interval = setInterval(() => {
        if (startAnimation) {
          setActiveStep((prev) =>{if (prev === 3) {
            clearInterval(interval);
            return 4;
          }
          return prev + 1;});
        }
      }, 500);
      return () => clearInterval(interval);
  },[startAnimation]);
  return (
    <div
      id="journey"
      className="journey w-screen h-auto flex flex-col bg-white items-center justify-center gap-20 p-20"
    >
      <Hero_header_steps
        minheading="CONTINUUM"
        mainHeader="From understanding your health to knowing what to do next"
      />
      <div
        className="flex items-center justify-between w-full border-2 border-[#00C9A7] p-20 bg-[#F8F9FB] rounded-3xl"
        ref={sectionRef}
      >
        <Journey
          icon={Activity}
          activityName="Health Insight"
          active={activeStep >= 0}
        />
        <div className="h-[2px] w-40 bg-[#00C9A7]" />
        <Journey
          icon={Sparkles}
          activityName="Personalized Guidance"
          active={activeStep >= 1}
        />
        <div className="h-[2px] w-40 bg-[#00C9A7]" />
        <Journey
          icon={MapPin}
          activityName="Nearby Healthcare"
          active={activeStep >= 2}
        />
        <div className="h-[2px] w-40 bg-[#00C9A7]" />
        <Journey
          icon={DollarSign}
          activityName="Approximate Cost"
          active={activeStep >= 3}
        />
      </div>
    </div>
  );
};
export default Hero_Journey;
