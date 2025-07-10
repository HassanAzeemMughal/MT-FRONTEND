"use client";
import React, { useEffect, useState } from "react";
import { ImMenu } from "react-icons/im";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryData } from "@/features/category/categorySlice";
import Link from "next/link";
import CartOverLayModal from "./CartOverLayModal";
import { FaHeart } from "react-icons/fa";
import WishlistOverLayModal from "./WishlistOverLayModal";

const BottomHeader = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlistOpen, setWishlistIsOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { data = [], loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  const parentCategories = Array.isArray(data)
    ? data.filter((cat) => cat.parent === null)
    : [];

  const childCategories = Array.isArray(data)
    ? data.filter((cat) => cat.parent && cat.parent._id)
    : [];

  if (loading)
    return <div className="p-4 text-gray-500">Loading categories...</div>;

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="relative">
      <div className="h-[80px] flex items-center justify-between px-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <ImMenu />
          <h1 className="text-text-white text-xl">Shopping Cart</h1>
        </div>

        {/* Center Navigation */}
        <div className="md:flex hidden items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <h1 className="text-text-white font-normal text-[18px] leading-5 cursor-pointer">
              Home
            </h1>
          </Link>

          {parentCategories.map((parent, index) => (
            <div key={index} className="relative group">
              <Link
                href={`/shop/category/${parent.slug}`}
                className="text-text-white font-normal text-[18px] leading-5 cursor-pointer"
              >
                {parent.title}
              </Link>

              {/* Child Categories (Show on Hover) */}
              <div className="absolute left-0 top-full w-64 bg-white text-white py-6 px-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 shadow-lg z-10">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-lg font-bold mb-2">Category Page</h2>
                    <ul className="space-y-1">
                      <li>Airpods</li>
                      <li>Headphones</li>
                      <li>Laptops</li>
                      <li>Mobiles</li>
                      <li>Smart-Watches</li>
                      <li>Speaker</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold mb-2">Feature Product</h2>
                    <ul className="space-y-1">
                      <li>Product Video</li>
                      <li>Simple Product</li>
                      <li>Product Countdown Timer</li>
                      <li>Product Color Swatch</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div
                className="mt-5 hidden absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-white shadow-lg rounded-lg border p-4 h-[200px] z-50 group-hover:flex"
                onMouseEnter={(e) => e.currentTarget.classList.add("flex")}
                onMouseLeave={(e) => e.currentTarget.classList.remove("flex")}
              >
                <div className="grid grid-cols-4 gap-1 w-full">
                  {childCategories
                    .filter((child) => child.parent._id === parent._id)
                    .map((child, i) => (
                      <div key={i} className="py-2 text-center cursor-pointer">
                        {child.title}
                      </div>
                    ))}
                </div>
              </div> */}
            </div>
          ))}

          <Link href="/">
            <h1 className="text-text-white font-normal text-[18px] leading-5 cursor-pointer">
              About
            </h1>
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <IoSearch fill="#FFFFFF" size={20} />
          <Link href="/auth/login" className="text-text-white">
            <IoSettingsOutline fill="#FFFFFF" size={20} />
          </Link>
          <div
            className="relative cursor-pointer"
            onClick={() => setWishlistIsOpen(true)}
          >
            <div className="text-text-white">
              <FaHeart fill="white" size={20} />
            </div>
            {wishlistItems.length >= 1 ? (
              <span className="count absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistItems.length ? wishlistItems.length : ""}
              </span>
            ) : (
              ""
            )}
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="text-text-white">
              <FiShoppingCart fill="white" size={20} />
            </div>
            {cartItems.length >= 1 ? (
              <span className="count absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.length ? cartItems.length : ""}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <CartOverLayModal setIsOpen={setIsOpen} isOpen={isOpen} />

      <WishlistOverLayModal
        setWishlistIsOpen={setWishlistIsOpen}
        isWishlistOpen={isWishlistOpen}
      />
    </div>
  );
};

export default BottomHeader;
