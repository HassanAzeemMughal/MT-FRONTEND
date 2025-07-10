"use client";
import React, { useEffect, useState } from "react";
import HeaderBannerImage from "../../assets/banner-image/header-banner.webp";
import Image from "next/image";
import NoImage from "../../assets/no-image/no-image-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "@/features/cart/cart-slice";
import RemoveItemModal from "@/components/layout/components/RemoveItemModal";
import { calculateCartTotals } from "@/utils/cartUtils";

const page = () => {
  const dispatch = useDispatch();
  const [isRemoveItemModal, setIsRemoveItemModal] = useState(true);
  const [productToRemove, setProductToRemove] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  const [totals, setTotals] = useState(null);
  console.log("====cartItems", cartItems);

  const handleRemoveItem = (item) => {
    setProductToRemove(item);
    setShowConfirm(true);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const result = calculateCartTotals(cartItems);
      setTotals(result);
    }
  }, [cartItems]);

  const handleDecreaseQuantity = (product) => {
    if (product.quantity === 1) {
      handleRemoveItem(product);
    } else {
      dispatch(decreaseQuantity(product));
    }
  };

  const confirmRemove = () => {
    if (productToRemove) {
      dispatch(deleteFromCart(productToRemove.cartItemId));
      setShowConfirm(false);
      setProductToRemove(null);
    }
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product));
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
          width: "100%",
          zIndex: 1,
        }}
      >
        <span className="text-[16px] font-semibold text-white">CART</span>
        <span className="text-[16px] font-semibold text-white">
          HOME / CART
        </span>
      </div>
      <div className="px-20 py-20">
        <div className="max-w-6xl mx-auto p-4">
          <div className="border border-gray-200 rounded-md">
            {/* Coupon + Timer Row */}
            <div className="flex flex-col lg:flex-row justify-between items-center p-4 gap-4 bg-white">
              <div className="flex items-center gap-2 w-full lg:w-1/2">
                <input
                  type="text"
                  placeholder="Enter your coupon code"
                  className="border-b border-gray-400 text-sm p-2 w-full outline-none"
                />
                <button className="bg-[#84312F] text-white px-4 py-2 font-semibold text-sm hover:bg-[#a0433f]">
                  APPLY COUPON
                </button>
              </div>
              <div className="bg-[#f5f0e9] text-sm text-[#84312F] px-4 py-2 rounded-md w-full lg:w-auto text-center">
                Order in the next{" "}
                <span className="font-bold text-red-600">0 : 0 : 0</span>
                <br />
                to get it{" "}
                <span className="font-semibold text-[#84312F]">
                  Wednesday, January 8th*
                </span>
              </div>
            </div>

            {/* Header Row */}
            <div className="grid grid-cols-12 bg-bg-eerie-black p-4 font-semibold text-sm text-gray-700">
              <div className="col-span-6 text-white">Product</div>
              <div className="col-span-6 text-right text-white">Price</div>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <Image
                  src={NoImage}
                  alt="No Wishlist Items"
                  className="mx-auto w-[120px] h-[120px] mb-6 opacity-70"
                />
                <h2 className="text-white text-2xl font-semibold mb-2">
                  Your cart is empty
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
              cartItems.map((item) => (
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

                  <div className="col-span-6 flex items-center justify-end gap-6">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-2 border border-gray-400 px-2 py-1 rounded-md">
                      <button
                        onClick={() => handleDecreaseQuantity(item)}
                        className="text-white font-bold px-2 hover:text-red-500"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity || 1}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        className="text-white font-bold px-2 hover:text-green-500"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-semibold text-sm text-white">
                      $
                      {item?.discount > 0 && item?.offerPrice
                        ? item.offerPrice
                        : item.price}
                    </span>

                    {/* Total Price */}
                    <span className="font-semibold text-sm text-white">
                      $
                      {(item.discount
                        ? item.offerPrice * item.quantity
                        : item.price * item.quantity
                      ).toFixed(2)}
                    </span>

                    {/* Remove */}
                    <button
                      className="text-white hover:text-red-600 text-xl font-bold"
                      onClick={() => handleRemoveItem(item)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <RemoveItemModal
        setIsRemoveItemModal={setIsRemoveItemModal}
        isRemoveItemModal={isRemoveItemModal}
        setShowConfirm={setShowConfirm}
        showConfirm={showConfirm}
        setProductToRemove={setProductToRemove}
        confirmRemove={confirmRemove}
      />
    </div>
  );
};

export default page;
