"use client";
import React, { useState } from "react";
import NoImage from "../../../assets/no-image/no-image-icon.png";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

const Page = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <div className="flex items-center justify-between px-20 py-8 bg-text-600">
        <span className="text-[16px] font-semibold">PRODUCT</span>
        <span className="text-[16px] font-semibold">HOME / PRODUCT</span>
      </div>
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {/* Left Side - Images */}
        <div className="flex flex-col md:w-1/2">
          <Image src={NoImage} alt="Main Product" className="w-[500px]" />
          <div className="flex gap-2 mt-4">
            <Image src={NoImage} alt="Thumbnail 1" className="w-16 h-16" />
            <Image src={NoImage} alt="Thumbnail 2" className="w-16 h-16" />
            <Image src={NoImage} alt="Thumbnail 3" className="w-16 h-16" />
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-semibold">Jhecked Flannel Shirt</h1>
          <p className="text-lg text-green-500">$79.00 - $89.00</p>
          <p className="text-red-500 text-sm">⚡ 5 sold in last 23 hours</p>
          <p className="mt-2 text-gray-600">
            Viverra a consectetur enim in malesuada fusce dolor mi massa leo
            taciti nulla vestibulum dignissim senectus vitae elit ullamcorper
            primis.
          </p>

          <div className="mt-4">
            <p className="font-bold text-sm">
              HURRY! ONLY <span className="text-blue-500">19</span> LEFT IN
              STOCK.
            </p>
            <div className="bg-gray-200 h-2 rounded-full mt-1">
              <div className="bg-blue-400 h-2 w-1/4 rounded-full"></div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex space-x-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm">DAYS</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">06</p>
              <p className="text-sm">HOURS</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">34</p>
              <p className="text-sm">MINUTES</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">48</p>
              <p className="text-sm">SECONDS</p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-4">
            <p className="font-semibold">Color:</p>
            <div className="flex space-x-2 mt-1">
              <div className="w-6 h-6 bg-black rounded-full border"></div>
              <div className="w-6 h-6 bg-yellow-600 rounded-full border"></div>
              <div className="w-6 h-6 bg-blue-400 rounded-full border"></div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-4">
            <p className="font-semibold">Size:</p>
            <div className="flex space-x-4 mt-1">
              <button className="border px-4 py-1">L</button>
              <button className="border px-4 py-1">M</button>
              <button className="border px-4 py-1">XS</button>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex border p-2 items-center">
              <button
                className="px-2"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-2"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="bg-black text-white py-2 px-6 flex items-center gap-2">
              <FaShoppingCart /> ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
