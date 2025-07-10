"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const page = () => {
  const pathname = usePathname();
  const orderId = pathname?.split("/").pop() || "N/A"; // Extract order ID safely

  return (
    <div className="">
      <div className="flex items-center justify-between px-20 py-8 bg-text-600">
        <span className="text-[16px] font-semibold">COMPLETE ORDER</span>
        <span className="text-[16px] font-semibold">HOME / COMPLETE ORDER</span>
      </div>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center my-6">
        {/* Checkmark icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Thank You For Your Order
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          You will receive an email with your order details
        </p>

        {/* Order ID */}
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm font-medium text-gray-500">Your Order ID</p>
          <p className="text-lg font-bold text-gray-800 mt-1">#{orderId}</p>
        </div>

        {/* Continue shopping button */}
        <Link
          href={"/"}
          className="mt-6 w-full bg-[#333] hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-150"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default page;
