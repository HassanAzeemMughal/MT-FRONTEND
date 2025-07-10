"use client";
import { Col, Row } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FaFacebookF,
  FaFax,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import { IoLogoGoogleplus } from "react-icons/io";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

const Footer = () => {
  const router = useRouter();

  const handleLeftSideBar = () => {
    router.push("/shop/left_sidebar");
  };
  return (
    <div className="mt-9">
      <hr />
      <div className="mt-9">
        <Row>
          <Col xl={10} lg={10} md={10}>
            <div>
              <h1 className="text-[40px] font-bold text-white">Junaid Store</h1>
              <p className="text-sm font-normal text-text-800 leading-[32px] w-[500px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </p>
            </div>
            <div className="mt-5 flex items-center gap-5">
              <FaFacebookF fill="#FFFFFF" />
              <IoLogoGoogleplus fill="#FFFFFF" />
              <FaTwitter fill="#FFFFFF" />
              <FaInstagram fill="#FFFFFF" />
            </div>
          </Col>
          <Col xl={4} lg={4} md={4}>
            <div>
              <h1 className="text-[18px] font-bold text-white">MY ACCOUNT</h1>
              <div
                onClick={handleLeftSideBar}
                className="mt-9 flex flex-col gap-3 cursor-pointer"
              >
                <h2 className="text-text-800 relative group inline-block">
                  Women
                  <span className="absolute left-0 bottom-0 h-[2.5px] bg-red-500 transition-all duration-300 group-hover:w-[50px] w-0"></span>
                </h2>

                <h2 className="text-text-800 relative group inline-block">
                  Clothing
                  <span className="absolute left-0 bottom-0 h-[3px] bg-red-500 transition-all duration-300 group-hover:w-[55px] w-0"></span>
                </h2>

                <h2 className="text-text-800 relative group inline-block">
                  Accessories
                  <span className="absolute left-0 bottom-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[70px] w-0"></span>
                </h2>

                <h2 className="text-text-800 relative group inline-block">
                  Featured
                  <span className="absolute left-0 bottom-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[55px] w-0"></span>
                </h2>
              </div>
            </div>
          </Col>

          <Col xl={4} lg={4} md={4}>
            <div>
              <h1 className="text-[18px] font-bold text-white">
                WHY WE CHOOSE
              </h1>
              <div className="mt-9 flex flex-col gap-3">
                <h2 className="text-text-800 relative group inline-block">
                  Shipping & Return
                  <span className="absolute left-0 bottom-0 h-[2.5px] bg-red-500 transition-all duration-300 group-hover:w-[115px] w-0"></span>
                </h2>
                <h2 className="text-text-800 relative group inline-block">
                  Secure Shopping
                  <span className="absolute left-0 bottom-0 h-[2.5px] bg-red-500 transition-all duration-300 group-hover:w-[105px] w-0"></span>
                </h2>
                <h2 className="text-text-800 relative group inline-block">
                  Gallary
                  <span className="absolute left-0 bottom-0 h-[2.5px] bg-red-500 transition-all duration-300 group-hover:w-[40px] w-0"></span>
                </h2>
                <h2 className="text-text-800 relative group inline-block">
                  Affiliates
                  <span className="absolute left-0 bottom-0 h-[2.5px] bg-red-500 transition-all duration-300 group-hover:w-[55px] w-0"></span>
                </h2>
                <h2 className="text-text-800 relative group inline-block">
                  Contacts
                  <span className="absolute left-0 bottom-0 h-[2.5px] bg-red-500 transition-all duration-300 group-hover:w-[55px] w-0"></span>
                </h2>
              </div>
            </div>
          </Col>
          <Col xl={4} lg={4} md={4}>
            <div>
              <h1 className="text-[18px] font-bold text-white">
                STORE INFORMATION
              </h1>
              <div className="mt-9 flex flex-col gap-3">
                <div className="flex items-center gap-5">
                  <span>
                    <MdLocationOn fill="#999999" />
                  </span>
                  <p className="text-text-800">
                    Multikart Demo Store, Demo store India 345-659
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <span>
                    <FaPhoneAlt fill="#999999" />
                  </span>
                  <p className="text-text-800">Call Us: 123-456-7898</p>
                </div>
                <div className="flex items-center gap-5">
                  <span>
                    <IoMailUnreadOutline fill="#999999" />
                  </span>
                  <p className="text-text-800">Email Us: Support@Fiot.com</p>
                </div>
                <div className="flex items-center gap-5">
                  <span>
                    <FaFax fill="#999999" />
                  </span>
                  <p className="text-text-800">Fax: 123456</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <hr className="mt-9" />
      <div className="mt-7 mb-7">
        <h1 className="text-sm text-text-800">
          © 2023-24 themeforest powered by pixelstrap
        </h1>
      </div>
    </div>
  );
};

export default Footer;
