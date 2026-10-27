import { useState,useEffect } from "react";
import heroBg from "../assets/Hero-bg.png";
import logoImage from "../assets/hero-logo.png"
import HeroCard from "./HeroCard";
import { Link } from "react-router-dom";
import Hero_TrustBanner from "./Hero_TrustBanner";
import Hero_stats from "./Hero_stats";
import Hero_features from "./Hero_features";
import Hero_how_works from "./Hero_how_works";
import Hero_Journey from "./Hero_Journey";
import Hero_Explainibility from "./Hero_Explainibility"
import Hero_finalCTA from "./Hero_finalCTA";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
export function CTAButtons({ primary, secondary, primaryTo, secondaryTo,secondaryHref }) {
  return (
    <div className="text-white flex justify-start gap-8 text-lg">
      <Link
        to={primaryTo}
        className="border-[#00C9A7] border-2 px-4 py-2 rounded-3xl text-black bg-[#00C9A7] font-semibold transition-transform duration-500 hover:scale-105"
      >
        {primary}
      </Link>
      {secondaryHref ? (
        <a
          href={secondaryHref}
          className="border-white border-2 px-4 py-2 rounded-3xl transition-transform duration-500 hover:scale-105"
        >
          {secondary}
        </a>
      ) : (
        <Link
          to={secondaryTo}
          className="border-white border-2 px-4 py-2 rounded-3xl transition-transform duration-500 hover:scale-105"
        >
          {secondary}
        </Link>
      )}
    </div>
  );
};

export function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token")),
  );
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "{}"),
  );

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("token");
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

      setIsLoggedIn(Boolean(token));
      setUser(savedUser);
    };

    window.addEventListener("focus", syncAuth);
    window.addEventListener("pageshow", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("focus", syncAuth);
      window.removeEventListener("pageshow", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser({});
    navigate("/", { replace: true });
  };

  return (
    <div className="h-full w-full flex justify-between items-center">
      <div className="w-1/6 h-full flex items-center">
        <a href="#home" className="inline-flex">
          <img src={logoImage} alt="HEALIX" className="w-auto h-full" />
        </a>
      </div>

      <div className="h-full w-2/5 flex justify-between items-center text-white text-xl">
        <a
          href="#home"
          className="transition-transform duration-300 hover:underline hover:decoration-[#00C9A7] underline-offset-4"
        >
          Home
        </a>
        <a
          href="#journey"
          className="transition-transform duration-300 hover:underline hover:decoration-[#00C9A7] underline-offset-4"
        >
          About
        </a>
        <a
          href="#features"
          className="transition-transform duration-300 hover:underline hover:decoration-[#00C9A7] underline-offset-4"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="transition-transform duration-300 hover:underline hover:decoration-[#00C9A7] underline-offset-4"
        >
          How it works
        </a>
        <a
          href="#footer"
          className="transition-transform duration-300 hover:underline hover:decoration-[#00C9A7] underline-offset-4"
        >
          Contact
        </a>
      </div>

      {isLoggedIn ? (
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/Dashboard")}
            className="flex items-center gap-2 text-white text-xl"
            aria-label="Open profile"
          >
            <Avatar sx={{ bgcolor: "#00C9A7", color: "#061021" }}>
              {user.fullName?.trim()?.charAt(0)?.toUpperCase() || "P"}
            </Avatar>
            <span>{
              JSON.parse(localStorage.getItem("user") || "{}") .fullName?.trim()
              .split(/\s+/)[0] || "Profile"}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xl text-white hover:text-[#00C9A7]"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <CTAButtons
          primary="Register Now"
          secondary="Login"
          primaryTo="/register"
          secondaryTo="/login"
        />
      )}
    </div>
  );
}

const Hero = () => {
   const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const handleScroll=()=>{
      setScrolled(window.scrollY >50);
    }
     window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
  },[])
  return (
    <div>
      <div
        id="home"
        className="h-screen w-screen relative bg-cover bg-center
             before:absolute before:inset-0 before:bg-black/55 before:content-['']"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div
          className={`fixed top-0 left-0 z-50 w-full h-20 px-10 flex items-center  transition-colors duration-300 ${
            scrolled
              ? "bg-[#061021] border-2 border-gray-600 rounded-lg shadow-xl"
              : "bg-transparent"
          }`}
        >
          <Navbar />
        </div>
        <div className="relative h-2/3 w-full flex justify-start items-center gap-2 inset-y-1/2 -translate-y-1/2 p-0">
          <div className="w-3/5 h-full flex flex-col justify-center gap-7  px-28">
            {/* //hero-left */}
            <h3 className="text-xs border-2 border-[#00C9A7] rounded-xl w-fit px-3 py-1 text-[#00C9A7]">
              Meet Healix Companion
            </h3>
            <div>
              <h1 className="text-7xl text-white font-serif">
                Your AI - Powered Health Companion
              </h1>
            </div>
            <p className="text-white text-lg">
              Understand your symptoms, explore potential causes, and find
              nearby healthcare-all in one place. Intelligent insights made
              simple.
            </p>
            <CTAButtons
              primary="Get started Now →"
              secondary="Explore How it works"
              primaryTo="/get-started"
              secondaryHref="#how-it-works"
            />
          </div>
          <div className="w-1/4 h-5/6 flex flex-col justify-center items-center ml-24 mt-10 border-2 border-gray-400 rounded-3xl bg-white/5">
            <HeroCard />
          </div>
        </div>
      </div>
      <Hero_TrustBanner />
      <Hero_features />
      <Hero_stats />
      <Hero_how_works />
      <Hero_Journey />
      <Hero_Explainibility />
      <Hero_finalCTA />
      <Footer />
    </div>
  );
};
export default Hero;
