"use client";
import React, { useState, useEffect } from "react";
import SpeakerIcon from "../assets/images/speaker.png";
import { Card, Col, Input, Row } from "antd";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaFax,
  FaGooglePlusG,
  FaHeart,
  FaInstagram,
  FaPhoneAlt,
  FaRegEye,
  FaShoppingCart,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import ButtonComponent from "@/components/ButtonComponent/page";
import Image from "next/image";
import MainPageCategory from "./mainComponent/MainPageCategory";
import bannerImage from "../assets/banner-image/main-banner-1.webp";
import discountImage from "../assets/banner-image/discount-image.webp";
import slifing1 from "../assets/sliding-image/sliding1.webp";
import slifing2 from "../assets/sliding-image/sliding2.webp";
import slifing3 from "../assets/sliding-image/sliding3.webp";
import slifing4 from "../assets/sliding-image/sliding4.webp";
import slifing5 from "../assets/sliding-image/sliding5.webp";
import slifing6 from "../assets/sliding-image/sliding6.webp";
import slifing7 from "../assets/sliding-image/sliding7.webp";
import blogs1 from "../assets/blogs/blog-1.webp";
import blogs2 from "../assets/blogs/blog-2.webp";
import blogs3 from "../assets/blogs/blog-3.webp";
import { LuHeart } from "react-icons/lu";
import { MdCompareArrows } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import TrendingProduct from "./mainComponent/TrendingProduct";

const Page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("1");
  const [stars, setStars] = useState([]); // Initialize state for stars
  const starsCount = 100; // Total stars to be generated initially
  const images = [
    slifing1,
    slifing2,
    slifing3,
    slifing4,
    slifing5,
    slifing6,
    slifing7,
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === images.length - itemsPerView ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const createStar = () => {
    const randomX = Math.random(); // Random left position
    const randomDuration = Math.random() * 2 + 3; // Random duration between 3s and 5s
    const randomDelay = Math.random() * 5; // Random delay between 0s and 5s

    return { randomX, randomDuration, randomDelay };
  };

  useEffect(() => {
    // Generate initial stars
    const initialStars = Array.from({ length: starsCount }, createStar);
    setStars(initialStars);

    // Interval to add new stars
    const interval = setInterval(() => {
      setStars((prevStars) => [...prevStars, createStar()]); // Add a new star to the array
    }, 1000); // Add new star every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleTabChange = (key) => setActiveTab(key);

  const Tab = ({ tab }) => (
    <span
      onClick={() => handleTabChange(tab.key)}
      className={`text-text-900 text-[18px] font-normal`}
      style={{
        color: activeTab === tab.key ? "#cc2121" : "black", // Set default color to black
        cursor: "pointer", // Change cursor to pointer for better UX
      }}
    >
      {tab.label}
    </span>
  );

  const items = [
    {
      id: 1,
      discount: "30%",
      title: "ELECTRONIC",
      buttonText: "SHOP NOW",
      imageUrl: SpeakerIcon,
    },
    {
      id: 2,
      discount: "25%",
      title: "SMART DEVICES",
      buttonText: "DISCOVER NOW",
      imageUrl: SpeakerIcon,
    },
    {
      id: 3,
      discount: "40%",
      title: "AUDIO EQUIPMENT",
      buttonText: "EXPLORE",
      imageUrl: SpeakerIcon,
    },
  ];

  const prevSlide = () => {
    const index = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  const blogs = [
    {
      image: blogs1,
      date: "01 May, 2024",
      title: "The Techno-Themed Laptop Lifestyle",
      description:
        "In today's digitally driven world, laptops have become indispensable tools for work, entertainment, and creative...",
    },
    {
      image: blogs2,
      date: "01 May, 2024",
      title: "The Melodies of Mobile Technology",
      description:
        "In the symphony of modern living, technology orchestrates a constant rhythm, shaping our daily routines and interactions...",
    },
    {
      image: blogs3,
      date: "01 May, 2024",
      title: "Exploring the Cutting Edge of Mobile Technology",
      description:
        "Welcome to TechnoTrends, your go-to destination for all things related to the dynamic and ever-evolving world of mobile...",
    },
  ];

  return (
    <div className="bg-bg-black">
      <div
        className=""
        style={{
          backgroundImage: `url(${bannerImage.src})`,
          backgroundSize: "cover",
          position: "relative",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <div className="px-20 flex items-center h-[500px]">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-5 bg-black rounded-full p-2 shadow hover:bg-gray-200 transition"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Carousel Content */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-[#999999] text-[18px] font-bold">
                Save {items[currentIndex].discount}
              </p>
              <h2 className="text-[60px] font-bold text-white">
                {items[currentIndex].title}
              </h2>
              <ButtonComponent
                text={items[currentIndex].buttonText}
                type="button"
              />
            </div>
            {/* <div className="mt-4">
              <Image
                src={items[currentIndex].imageUrl}
                alt={items[currentIndex].title}
                className="object-contain h-[200px] mx-auto"
              />
            </div> */}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-5 bg-black rounded-full p-2 shadow hover:bg-gray-200 transition"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="px-20 bg-bg-black relative min-h-[1200px] overflow-hidden">
        {stars.map((star, index) => (
          <div
            key={index}
            className="star-animation"
            style={{
              animationDelay: `${star.randomDelay}s`,
              left: `${star.randomX * 100}%`,
              animationDuration: `${star.randomDuration}s`,
            }}
          >
            <FaStar className="text-yellow-500" />
          </div>
        ))}

        <div className="mt-16">
          <div>
            <h1 className="text-white text-4xl">TRENDING CATEGORIES</h1>
          </div>
          <div className="mt-10">
            <MainPageCategory />
          </div>
        </div>

        <div className="mt-16">
          <TrendingProduct />
          {/* <div>
            <h1 className="text-white text-4xl">TRENDING PRODUCTS</h1>
          </div>
          <div className="mt-10">
            <TrendingProduct />
          </div> */}
        </div>
      </div>
      <div className="px-20 mt-10">
        <div
          className="relative min-h-[600px] flex justify-center bg-bg-eerie-black"
          style={{
            backgroundImage: `url(${discountImage.src})`,
            backgroundSize: "cover",
            position: "relative",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div className="max-w-4xl mt-5 flex flex-col items-center">
            <p className="text-gray-400 text-sm uppercase">Big Discount</p>
            <h1 className="text-white text-3xl font-bold mt-2">
              Apple iPhone 15 Pro Max
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-bg-blue text-xl font-semibold">$50.00</span>
              <span className="text-gray-400 text-lg line-through">$55.00</span>
            </div>
            <button className="mt-4 bg-bg-red text-white px-6 py-2 flex items-center gap-2 hover:bg-blue-600 transition">
              <span className="text-lg">+</span> Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="px-20 container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div className="bg-black text-white border border-gray-800 overflow-hidden shadow-lg">
              <Image
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-400 text-sm">{blog.date}</p>
                <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>
                <p className="text-gray-300 mt-2">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-20">
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${activeIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-1/5 flex-shrink-0 px-2">
                <Image
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-20">
        <div className="mt-7 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-[18px]">KNOW IT ALL FIRST!</h1>
            <p className="text-[14px] font-medium text-text-800">
              Never Miss Anything From Multikart By Signing Up To Our
              Newsletter.
            </p>
          </div>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              className="flex-grow px-4 py-2 focus:outline-none"
              type="text"
              placeholder="Enter your email"
            />
            <ButtonComponent
              className="bg-red-600 text-white font-semibold px-6 py-2 hover:bg-red-700 transition-all"
              text="Subscribe"
              type="button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
