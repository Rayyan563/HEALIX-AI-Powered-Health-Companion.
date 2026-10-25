import { useState } from "react";
import logoImage from "./assets/hero-logo.png";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import LogoutIcon from "@mui/icons-material/Logout";

export function UploadAvatars() {
  const [avatarSrc, setAvatarSrc] = useState(undefined);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <ButtonBase
      component="label"
      role={undefined}
      tabIndex={-1} // prevent label from tab focus
      aria-label="Avatar image"
      sx={{
        borderRadius: "40px",
        "&:has(:focus-visible)": {
          outline: "2px solid",
          outlineOffset: "2px",
        },
      }}
    >
      <Avatar alt="Upload new avatar" src={avatarSrc} />
      <input
        type="file"
        accept="image/*"
        style={{
          border: 0,
          clipPath: "inset(50%)",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          whiteSpace: "nowrap",
          width: "1px",
        }}
        onChange={handleAvatarChange}
      />
    </ButtonBase>
  );
}
const Navbar_links = ({pathTo, name}) => {
  return(
  <Link
    to={pathTo}
    className="transition-transform duration-300 hover:underline hover:decoration-[#00C9A7] underline-offset-4"
  >
    {name}
  </Link>
  );
};
const Navbar_main = () => {
  return (
    <div className="sticky w-screen h-16 bg-[#0B1A2E] flex justify-between px-8 items-center">
      <div className="h-full flex items-center pr-3">
        <Link to="/" className="h-full flex items-center">
          <img src={logoImage} alt="HEALIX" className="w-auto h-full" />
        </Link>
      </div>
      <div className="h-full flex justify-evenly items-center text-white gap-6 text-lg">
        <Navbar_links pathTo="/Healix_Home" name="Home" />
        <Navbar_links pathTo="/Dashboard" name="Dashboard" />
        <Navbar_links pathTo="/HealthAssesment" name="HealthAssesment" />
        <Navbar_links pathTo="/MedicalReports" name="Medical Reports" />
        <Navbar_links pathTo="/Guidance" name="Guidance" />
        <Navbar_links pathTo="/HealthCare" name="HealthCare" />
        <Navbar_links pathTo="/CostEstimator" name="Cost Estimator" />
        <Navbar_links pathTo="/AskHealix" name="Ask Healix" />
      </div>
      <div className="flex items-center justify-center gap-4 text-xl ml-12">
        <div className="flex items-center gap-2 text-white font-thin">
          <UploadAvatars />
          <Navbar_links
            pathTo="/Dashboard"
            className="normal-case"
            name={
              JSON.parse(localStorage.getItem("user") || "{}")
                .fullName?.trim()
                .split(/\s+/)[0] || "Profile"
            }
          />
        </div>
        <div className="flex items-center text-white/60 gap-2">
          <LogoutIcon />
          <Navbar_links pathTo="/login" name="Logout" />
        </div>
      </div>
    </div>
  );
};
export default Navbar_main;
