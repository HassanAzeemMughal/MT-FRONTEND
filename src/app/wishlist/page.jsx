"use client";
import React from "react";
import HeaderBannerImage from "../../assets/banner-image/header-banner.webp";
import Image from "next/image";
import NoImage from "../../assets/no-image/no-image-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cart/cart-slice";
import {
  deleteAllFromWishlist,
  deleteFromWishlist,
} from "@/features/wishlist/wishlist-slice";
import { useRouter } from "next/navigation";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleAddToCart = (product) => {
    console.log("=======product", product);
    dispatch(addToCart(product));
  };
  return (
    <div>
      <div
        className="flex items-center justify-between px-20 py-8"
        style={{
          backgroundImage: `url(${HeaderBannerImage.src})`,
          backgroundSize: "cover",
          position: "relative",
          backgroundPosition: "center",
          height: "100%",
          width: "100%;",
          zIndex: 1,
        }}
      >
        <span className="text-[16px] font-semibold text-white">WISHLIST</span>
        <span className="text-[16px] font-semibold text-white">
          HOME / WISHLIST
        </span>
      </div>
      <div className="px-20 py-20">
        <div className="max-w-6xl mx-auto p-4">
          <div className="border border-gray-200 rounded-md">
            <div className="grid grid-cols-12 bg-bg-eerie-black p-4 font-semibold text-sm text-gray-700">
              <div className="col-span-6 text-white">Product</div>
              <div className="col-span-6 text-right text-white">Price</div>
            </div>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-20">
                <Image
                  src={NoImage}
                  alt="No Wishlist Items"
                  className="mx-auto w-[120px] h-[120px] mb-6 opacity-70"
                />
                <h2 className="text-white text-2xl font-semibold mb-2">
                  Your wishlist is empty
                </h2>
                <p className="text-gray-400 mb-6">
                  Looks like you haven't added anything yet.
                </p>
                <span
                  onClick={() => {
                    router.push("/");
                  }}
                  className="cursor-pointer bg-[#84312F] text-white px-6 py-2 font-semibold hover:bg-[#a0433f] transition"
                >
                  Continue Shopping
                </span>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-12 items-center p-4 border-t border-gray-200 bg-bg-eerie-black"
                >
                  <div className="col-span-6 flex items-center gap-4">
                    {Array.isArray(item?.images) && item?.images?.length > 0 ? (
                      <img
                        src={`${backendUrl}${item.images[0]}`}
                        alt="Product Image"
                        className="w-[150px] h-[150px] rounded-md"
                      />
                    ) : (
                      <Image
                        src={NoImage}
                        alt="No Image Available"
                        className="w-[150px] h-[150px] rounded-md"
                      />
                    )}
                    <span className="text-white text-sm">{item.name}</span>
                  </div>
                  <div className="col-span-6 flex items-center justify-end gap-4">
                    {item?.discount > 0 && item?.offerPrice ? (
                      <>
                        <span className="font-semibold text-sm text-white">
                          ${item.offerPrice}
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold text-sm text-white">
                        ${item.price}
                      </span>
                    )}
                    <button
                      className="bg-[#84312F] text-white px-4 py-2 text-sm font-semibold hover:bg-[#a0433f] transition"
                      onClick={() => handleAddToCart(item)}
                    >
                      ADD TO CART
                    </button>
                    <button
                      className="text-white hover:text-red-600 text-xl font-bold"
                      onClick={() => dispatch(deleteFromWishlist(item._id))}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {wishlistItems.length > 0 && (
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="bg-[#84312F] text-white px-6 py-2 font-semibold rounded hover:bg-[#a0433f] transition"
                onClick={() => dispatch(deleteAllFromWishlist())}
              >
                CLEAR WISHLIST
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
