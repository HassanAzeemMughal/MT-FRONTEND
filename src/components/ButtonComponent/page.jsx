import React from "react";

const Page = ({ text = "button", type = "button" }) => {
  return (
    <button
      type={type}
      className="mt-2 bg-[#cc2121] text-white py-3 px-4 font-semibold"
    >
      {text}
    </button>
  );
};

export default Page;
