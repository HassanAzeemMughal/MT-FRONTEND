"use client";
import React from "react";
import BottomHeader from "./components/BottomHeader";
import Footer from "./components/Footer";
import TopHeader from "./components/TopHeader";

const Index = ({ children }) => {
  return (
    <div className="bg-bg-black">
      <div className="px-20 bg-bg-eerie-black">
        <TopHeader />
      </div>
      <div className="px-20 bg-bg-black">
        <BottomHeader />
      </div>
      <div className="bg-bg-black">{children}</div>
      <div className="px-20 bg-bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
