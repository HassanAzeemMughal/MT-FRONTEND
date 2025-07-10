import React from "react";

const Page = ({ type = "text", placeholder = "Enter Name" }) => {
  return (
    <input
      className="px-4 py-2 focus:outline-none border border-gray-300 rounded"
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Page;
