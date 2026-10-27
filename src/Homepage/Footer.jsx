import logo from "../assets/hero-logo.png"
import { FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div id="footer" className="w-screen bg-[#061021] px-20 py-10 flex justify-between">
        <div className="boder-2">
          <div className="w-[200px] h-[80px]">
            <img src={logo} alt="Healix" />
          </div>
          <p className="w-[300px] text-white/60">
            HEALIX is an intelligent companion designed to provide educational
            symptom insights and healthcare mappings.
          </p>
        </div>
        <div className="grid grid-flow-col grid-rows-4 gap-x-36 gap-y-3 text-white justify-items-center p-8 [&_a]:inline-block [&_a]:transition-all [&_a]:duration-200 [&_a:hover]:text-[#00C9A7] [&_a:hover]:scale-105">
          <h3 className="text-white/60 text-sm font-semibold tracking-wider">
            PRODUCT
          </h3>
          <a href="#">How it works</a>
          <a href="#">Find Care</a>
          <a href="#">Transparency</a>

          <h3 className="text-white/60 text-sm font-semibold tracking-wider">
            COMPANY
          </h3>
          <a href="#">About S&A</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>

          <h3 className="text-white/60 text-sm font-semibold tracking-wider">
            CONTACT
          </h3>
          <a href="#">Support</a>
          <a href="#">Partner with us</a>
          <a href="#">Press kit</a>
        </div>
      </div>
      <div className="bg-[#061021]">
        <div className="border-t border-white/10 mx-20"></div>
        <div className="px-20 py-6 flex justify-between items-center text-sm text-white/50">
          <p>© 2026 HEALIX. All rights reserved.</p>
          <div className="flex gap-4 text-white/60 [&_svg]:transition-colors [&_svg:hover]:text-[#00C9A7]">
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="#" aria-label="Twitter">
              <FaXTwitter size={20} />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer