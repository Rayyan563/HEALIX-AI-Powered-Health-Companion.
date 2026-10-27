import { TaskAltRounded as TaskAltRoundedIcon } from "@mui/icons-material";
import { Shield, Activity, Clock , TrendingUp} from "lucide-react";
const Hero_Explainibility = () => {
  return (
    <div className="explainibilty h-[575px] w-screen flex justify-center items-center bg-[#F5F8FF]">
      <div className="exp-left h-5/6 w-1/2 pl-24 flex flex-col justify-center items-start gap-4">
        <h3 className="text-base rounded-2xl w-fit px-3 py-1 text-[#00C9A7] border-2 border-[#00C9A7] bg-[#00C9A7]/10">
          Clarity first
        </h3>
        <h1 className="text-6xl font-serif w-auto py-5">
          Don't just get a result. Understand why.
        </h1>
        <p className="text-base leading-6 text-black/60 pb-3">
          HEALIX explains every insight so you stay informed and in control. We
          analyze medical guidelines to connect symptoms with contributing
          factors, giving you a comprehensive breakdown of your assessment.
        </p>
        <p className="font-semibold font-serif">
          <TaskAltRoundedIcon className="text-[#00C9A7]" />
          &nbsp; Documented parameters & medical sources
        </p>
        <p className="font-semibold font-serif">
          <TaskAltRoundedIcon className="text-[#00C9A7]" />
          &nbsp; Clear, jargon-free health educational explanations
        </p>
      </div>
      <div className="exp-right h-5/6 w-1/2">
        <div className="w-[550px] h-full flex flex-col p-8 border-2 bg-white rounded-2xl justify-between bg-black/5 ml-20 drop-shadow-md">
          <div className="flex">
            <div className="w-full flex gap-3">
              <Shield className="text-sm text-[#00C9A7]" />
              <p className="text-base font-bold font-serif">
                Potential Health Consideration
              </p>
            </div>
            <div>
              <h3 className="text-base rounded-xl px-2 py-1 text-red-500 font-serif bg-red-800/10">
                Potential_Risk
              </h3>
            </div>
          </div>
          <div className="border"></div>
          <p className="font-semibold text-black/60 font-serif">
            Primary Indicators
          </p>
          <p className="font-serif flex">
            {" "}
            <Activity className="text-[#00C9A7]" />
            &nbsp; Bilateral temple pressure
          </p>
          <p className="font-serif flex">
            {" "}
            <Clock className="text-[#00C9A7]" />
            &nbsp; Late afternoon progression
          </p>
          <p className="font-serif flex">
            {" "}
            <TrendingUp className="text-[#00C9A7]" />
            &nbsp; Increased stress metrics last 5 days
          </p>
          <div className="border"></div>
          <p className="text-black/60 font-serif font-semibold">Evaluation Details</p>
          <p className="mb-8 text-black/60">
            Based on the information provided, these symptoms may be associated
            with physiological fatigue or persistent tension. It is common for
            these effects to compound under dehydration or postural stress.
          </p>
          {/* <div></div> */}
          <div className="w-full flex justify-between">
            <p className="font-serif text-[#00C9A7] underline">Learn More</p>
            <p className="font-serif font-semibold">Find nearby specialist</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero_Explainibility;
