import ctaBG from "../assets/final-cta.png"
import { Link } from "react-router-dom";
const Hero_finalCTA = () => {
  return (
    <div
      className="relative h-[550px] w-screen bg-cover"
      style={{ backgroundImage: `url(${ctaBG})` }}
    >
      <div className="absolute bg-[#0B1A2E] z-10 h-[550px] w-screen opacity-85"></div>
      <div className="w-screen z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 items-center justify-center">
        <h1 className="text-white font-serif font-medium text-6xl text-center leading-tight">
          Your health is personal.
          <br /> Your healthcare should be too.
        </h1>
        <p className="text-white/80 text-lg text-center">
          Join thousands who are taking control of their health journey with
          smart, real-time companions.
        </p>
        <Link
          to="/get-started"
          className="border-[#00C9A7] border-2 px-4 py-2 rounded-3xl text-black bg-[#00C9A7] font-semibold transition-transform duration-500 hover:scale-105"
        >
          Get Started for free →
        </Link>
      </div>
    </div>
  );
}
export default Hero_finalCTA