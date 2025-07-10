import React, { useEffect } from "react";
import { MdManageAccounts } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const TopHeader = () => {
  useEffect(() => {
    // Check if script already exists
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script"; // Add unique ID to prevent duplicates
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Google Translate Init Function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );

      // Remove Google Translate Bar after language selection
      setTimeout(() => {
        document.querySelector("body").style.top = "0px";

        const googleFrame = document.querySelector(".goog-te-banner-frame");
        if (googleFrame) googleFrame.style.display = "none";

        const googleLogo = document.querySelector(".goog-logo-link");
        if (googleLogo) googleLogo.style.display = "none";

        // Remove Inline Styling Google Adds
        const googleFrameParent = document.querySelector("html > body");
        if (googleFrameParent) googleFrameParent.style.position = "static";
      }, 500);
    };

    return () => {
      // Cleanup: Remove extra translate elements if needed
      const googleFrame = document.querySelector(".goog-te-banner-frame");
      if (googleFrame) googleFrame.remove();
    };
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="">
      <div className="flex items-center justify-between h-16 px-5">
        {/* Left Section */}
        <div className="flex items-center gap-7">
          <h1 className="text-text-white text-sm">
            Welcome to Our Junaid Store
          </h1>
          <p className="text-text-white text-sm">Call Us: 123 - 456 - 7890</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-7">
          {/* Language and Wishlist */}
          <div className="flex items-center gap-3">
            <h5 className="text-text-white text-sm">Language:</h5>
            <div id="google_translate_element"></div>
            <FaHeart fill="#999999" />
            <h1 className="text-text-white text-sm">Wishlist</h1>
          </div>

          {/* My Account */}
          <div className="flex items-center gap-3">
            <MdManageAccounts fill="#999999" />
            <p className="text-text-white text-sm">My Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
