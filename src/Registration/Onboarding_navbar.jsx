import logoImage from "../assets/hero-logo.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Onboarding_navbar = () => {
    const nextSteps=()=>{
        console.log("next step");
    }
  return (
    <div className="w-screen h-16 bg-[#0B1A2E] flex justify-between px-4 items-center">
      <div className="w-1/6 h-full flex items-center">
        <img src={logoImage} alt="HEALIX" className="w-auto h-full" />
      </div>
      <div className="flex items-center gap-2">
        <p className="flex items-center text-white/60">Setup Progress</p>
        <ArrowForwardIosIcon onClick={nextSteps} fontSize="large" className="text-[#00c9a7] "/>
      </div>
    </div>
  );
};
export default Onboarding_navbar;
