"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentMethod from "./components/PaymentMethod";
import { useSelector } from "react-redux";
import ShippingMethod from "./components/ShippingMethod";
import withAuth from "@/utils/withAuth";
import NoImage from "../../assets/no-image/no-image-icon.png";
const stripePromise = loadStripe(
  "pk_test_51R7LvvR5BFzenkvq7DyyfkKhOi4GabsERUB3tXR2Ocoz2DkLj9ga9327r8wawdKGQEHeV2bal5AIL7nSMmzjmDVr00p1XqpzNP"
);

const page = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isAuthDataLoaded, setIsAuthDataLoaded] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  let cartSubTotalPrice = 0;
  let cartTotalPrice = 0;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "UK",
    postcode: "",
    notes: "",
    saveDeliveryAddress: false,
  });

  const fieldRefs = useRef({});

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user && !isAuthDataLoaded) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        addressLine1: user.addressLine1 || "",
        addressLine2: user.addressLine2 || "",
        city: user.city || "",
        country: user.country || "UK",
        postcode: user.postcode || "",
        saveDeliveryAddress: false,
      });
      setIsAuthDataLoaded(true);
    }
  }, [user, isAuthDataLoaded]);

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return value.trim() ? "" : "First name is required.";
      case "lastName":
        return value.trim() ? "" : "Last name is required.";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Enter a valid email address.";
      case "phone":
        return /^[6789]\d{8}$/.test(value)
          ? ""
          : "Enter a valid Spanish phone number.";
      case "addressLine1":
        return value.trim() ? "" : "Address Line 1 is required.";
      case "city":
        return value.trim() ? "" : "City is required.";
      case "country":
        return value.trim() ? "" : "Country is required.";
      case "postcode":
        return /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(value)
          ? ""
          : "Enter a valid Spanish postcode.";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  return (
    <Elements stripe={stripePromise}>
      <div>
        <div className="flex items-center justify-between px-20 py-8 bg-text-600">
          <span className="text-[16px] font-semibold">CHECKOUT</span>
          <span className="text-[16px] font-semibold">HOME / CHECKOUT</span>
        </div>
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Delivery Address */}
            <div className="bg-white my-6">
              <h2 className="text-2xl font-bold mb-6">DELIVERY ADDRESS</h2>
              <div className="border-2 p-8">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border-2"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      ref={(el) => (fieldRefs.current.firstName = el)}
                      onBlur={handleBlur}
                    />
                    {formErrors.firstName && (
                      <span className="text-red-500 text-sm">
                        {formErrors.firstName}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border-2"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      ref={(el) => (fieldRefs.current.lastName = el)}
                      onBlur={handleBlur}
                    />
                    {formErrors.lastName && (
                      <span className="text-red-500 text-sm">
                        {formErrors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border-2"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    ref={(el) => (fieldRefs.current.email = el)}
                    onBlur={handleBlur}
                  />
                  {formErrors.email && (
                    <span className="text-red-500 text-sm">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Phone no*
                  </label>
                  <input
                    type="tel"
                    className="w-full p-2 border-2"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    ref={(el) => (fieldRefs.current.phone = el)}
                    onBlur={handleBlur}
                  />
                  {formErrors.phone && (
                    <span className="text-red-500 text-sm">
                      {formErrors.phone}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Address line 1*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border-2"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    ref={(el) => (fieldRefs.current.addressLine1 = el)}
                    onBlur={handleBlur}
                  />
                  {formErrors.addressLine1 && (
                    <span className="text-red-500 text-sm">
                      {formErrors.addressLine1}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Address line 2
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border-2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    ref={(el) => (fieldRefs.current.addressLine2 = el)}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border-2"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      ref={(el) => (fieldRefs.current.city = el)}
                      onBlur={handleBlur}
                    />
                    {formErrors.city && (
                      <span className="text-red-500 text-sm">
                        {formErrors.city}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country*
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border-2"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      ref={(el) => (fieldRefs.current.country = el)}
                      onBlur={handleBlur}
                    />
                    {formErrors.country && (
                      <span className="text-red-500 text-sm">
                        {formErrors.country}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Postcode*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border-2"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    ref={(el) => (fieldRefs.current.postcode = el)}
                    onBlur={handleBlur}
                  />
                  {formErrors.postcode && (
                    <span className="text-red-500 text-sm">
                      {formErrors.postcode}
                    </span>
                  )}
                </div>

                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    name="saveDeliveryAddress"
                    checked={formData.saveDeliveryAddress}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm">
                    If you want to save your delivery address, please check this
                    box.
                  </span>
                </div>
              </div>
            </div>
            {/* Right Column - Cart Total */}
            <div>
              <div className="bg-white w-full my-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  CART TOTAL
                </h2>

                <div className="space-y-6 p-6 border-2">
                  {/* Cart Items */}
                  <div className="space-y-4">
                    {cartItems.map((product, i) => {
                      cartSubTotalPrice += product.price * product.quantity;
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-4 border-b pb-4"
                        >
                          {Array.isArray(product?.images) &&
                          product?.images?.length > 0 ? (
                            <img
                              src={`${backendUrl}${product.images[0]}`}
                              alt="Product Image"
                              className="w-16 object-contain"
                            />
                          ) : (
                            <Image
                              className="w-16"
                              src={NoImage}
                              alt="Product Image"
                            />
                          )}
                          <span className="flex-1 text-gray-700 text-sm">
                            {product?.name}
                          </span>
                          <span className="font-medium text-gray-800">
                            £{product?.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Price Details */}
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Sub Total</span>
                      <span className="font-medium">
                        £{cartSubTotalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping Fee</span>
                      <span className="text-gray-500">
                        Select a shipping method
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-800 text-lg">
                      <span>Grand Total</span>
                      <span>£{cartSubTotalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <ShippingMethod />
            </div>
          </div>
        </div>
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PaymentMethod
              formData={formData}
              total={cartSubTotalPrice}
              validateField={validateField}
              setFormErrors={setFormErrors}
              fieldRefs={fieldRefs}
            />
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default withAuth(page);
