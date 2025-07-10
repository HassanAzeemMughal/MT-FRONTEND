import React from "react";

const ShippingMethod = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">SHIPPING METHOD</h2>

      {/* Time Counter + Delivery Date */}
      <div className="border-2 p-8">
        <div className="flex justify-between items-center mb-8 bg-black p-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-white">
              Order in the next
            </span>
            <span className="text-lg font-bold text-red-600">0 : 0 : 0</span>
          </div>
          <span className="text-white">Wednesday, January 8th*</span>
        </div>

        {/* Shipping Options */}
        <div className="space-y-4">
          {/* First Shipping Option */}
          <label className="flex items-start gap-4 p-4 border rounded-md hover:border-blue-500 cursor-pointer">
            <input
              type="radio"
              className="mt-1 w-5 h-5 accent-blue-500 cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">
                  Royal Mail Next Day Guaranteed
                </h3>
                <span className="font-bold">£10.85</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Service: Guaranteed next-day
              </p>
              <p className="text-xs text-gray-400 mt-1">
                *Could take up to 3 working days
              </p>
            </div>
          </label>

          {/* Second Shipping Option */}
          <label className="flex items-start gap-4 p-4 border rounded-md hover:border-blue-500 cursor-pointer">
            <input
              type="radio"
              className="mt-1 w-5 h-5 accent-blue-500 cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">Royal Mail Tracked 24</h3>
                <span className="font-bold">£2.99</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Next Working Day Delivery
              </p>
              <p className="text-xs text-gray-400 mt-1">
                *Could take up to 3 working days
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;
