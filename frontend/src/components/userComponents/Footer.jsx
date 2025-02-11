import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="text-sm text-center p-5 bg-[#f1f1f]">
        <p>© 2025 careerCraft | All rights reserved.</p>
        <p>
          Powered by <a href="https://github.com/Shahidclt93">Shahid</a>
        </p>
        <p>
          <Link to={"/PrivacyPolicy"}>Privacy Policy </Link> |
          <Link to={"/TermsofService"}> Terms of Service</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
