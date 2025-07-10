import { Slider } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const ShopFilters = ({
  setIsLoadingLoadMore,
  selectedColor,
  setSelectedColor,
  setSelectedSize,
  selectedSize,
  categoryRelateProducts,
  setIsCategoryOpen,
  isCategoryOpen,
  setIsColorsOpen,
  isColorsOpen,
  setIsSizeOpen,
  isSizeOpen,
  setIsPriceOpen,
  isPriceOpen,
  setPriceRange,
  priceRange,
}) => {
  const ColorOpenComponent = () => {
    const handleColorSelect = useCallback(
      (color) => {
        setIsLoadingLoadMore(true);
        setSelectedColor((prevColor) => (prevColor === color ? null : color));
        setTimeout(() => {
          setIsLoadingLoadMore(false);
        }, 500); // Adjust delay as per your requirements
      },
      [setSelectedColor, setIsLoadingLoadMore]
    );

    const uniqueColors = useMemo(() => {
      return [
        ...new Set(categoryRelateProducts.map((product) => product.color)),
      ];
    }, [categoryRelateProducts]);

    return (
      <ul className="mt-4 ms-2 space-y-3 font-medium text-[16px] text-text-800 max-h-40 overflow-y-scroll pr-2 left_sidebar_scrolling">
        {uniqueColors?.map((color, index) => (
          <li
            key={index}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleColorSelect(color)}
          >
            <span
              className="w-5 h-5 rounded-full border"
              style={{ backgroundColor: color }}
            ></span>
            {color}
            <span className="ml-auto">
              {selectedColor === color && (
                <FaCheck className="text-green-600 ml-auto" />
              )}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const SizeOpenComponent = () => {
    const handleSizeSelect = useCallback(
      (size) => {
        setIsLoadingLoadMore(true);
        setSelectedSize((prevSize) => (prevSize === size ? null : size));
        setTimeout(() => {
          setIsLoadingLoadMore(false);
        }, 500); // Adjust delay as per your requirements
      },
      [setSelectedSize, setIsLoadingLoadMore]
    );

    const dataArray = [
      { title: "small" },
      { title: "medium" },
      { title: "large" },
    ];

    return (
      //   <ul className="mt-4 ms-2 space-y-1 font-medium text-[16px] text-text-800">
      <ul className="mt-4 ms-2 space-y-3 font-medium text-[16px] text-text-800 max-h-40 overflow-y-auto pr-2 left_sidebar_scrolling">
        {dataArray?.map((item, index) => (
          <li
            className="flex items-center gap-3 cursor-pointer"
            key={index}
            onClick={() => handleSizeSelect(item?.title)}
          >
            {item.title.charAt(0).toUpperCase() + item.title.slice(1)}

            {selectedSize === item?.title && (
              <FaCheck className="text-green-600 ml-auto" />
            )}
          </li>
        ))}
      </ul>
    );
  };

  const handlePriceChange = (value) => {
    setIsLoadingLoadMore(true);
    setPriceRange(value);
    setTimeout(() => {
      setIsLoadingLoadMore(false);
    }, 500);
  };

  const PriceOpenComponent = () => {
    return (
      <div className="mt-4">
        <Slider
          range
          min={0}
          max={4000}
          onChange={handlePriceChange} // Handle price range change
          value={[...priceRange]}
          trackStyle={[{ backgroundColor: "#e14334" }]} // Custom track color
          handleStyle={[
            { borderColor: "#e14334" }, // Custom handle color
            { borderColor: "#e14334" },
          ]}
          tooltip={{ formatter: (value) => `$${value}` }} // Add tooltip for better UX
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-black text-white border border-bg-eerie-black p-4">
        {/* Filters Header */}
        <div className="flex items-center justify-between border-b border-bg-eerie-black pb-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Filters</span>
          </div>
        </div>

        {/* Availability Section */}
        <div className="border border-bg-eerie-black mb-4">
          <div className="bg-bg-eerie-black text-white p-3 flex justify-between items-center cursor-pointer">
            <span className="font-semibold text-sm">AVAILABILITY</span>
            <span>⌃</span>
          </div>
          <div className="p-3 text-sm">
            <div className="flex justify-between items-center text-gray-400">
              <span>0 selected</span>
              <button className="text-gray-300 text-xs hover:underline">
                Reset
              </button>
            </div>
            <div className="mt-3 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox border-gray-600 bg-transparent"
                />
                <span>In stock</span>
                <span className="ml-auto">5</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox border-gray-600 bg-transparent"
                />
                <span>Out of stock</span>
                <span className="ml-auto">2</span>
              </label>
            </div>
          </div>
        </div>

        {/* Size Section */}
        <div className="border border-bg-eerie-black mb-4">
          <div className="bg-bg-eerie-black text-white p-3 flex justify-between items-center cursor-pointer">
            <span className="font-semibold text-sm">Size</span>
            <span>⌃</span>
          </div>
          <div className="p-3 text-sm">
            <div className="flex justify-between items-center text-gray-400">
              {/* {isSizeOpen && ( */}
              <>
                <span>0 selected</span>
                <span
                  className="cursor-pointer text-gray-300 text-xs hover:underline"
                  onClick={() => {
                    setIsLoadingLoadMore(true);
                    setSelectedSize(null);
                    setTimeout(() => {
                      setIsLoadingLoadMore(false);
                    }, 500);
                  }}
                >
                  Reset
                </span>
              </>
              {/* )} */}
            </div>
            <SizeOpenComponent />
          </div>
        </div>

        {/* Color Section */}
        <div className="border border-bg-eerie-black mb-4">
          <div className="bg-bg-eerie-black text-white p-3 flex justify-between items-center cursor-pointer">
            <span className="font-semibold text-sm">Color</span>
            <span>⌃</span>
          </div>
          <div className="p-3 text-sm">
            <div className="flex justify-between items-center text-gray-400">
              {/* {isColorsOpen && ( */}
              <>
                <span>0 selected</span>
                <span
                  className="cursor-pointer text-gray-300 text-xs hover:underline"
                  onClick={() => {
                    setIsLoadingLoadMore(true);
                    setSelectedColor(null);
                    setTimeout(() => {
                      setIsLoadingLoadMore(false);
                    }, 500);
                  }}
                >
                  Reset
                </span>
              </>
              {/* )} */}
            </div>
            <ColorOpenComponent />
          </div>
        </div>

        {/* Price Section */}
        <div className="border border-bg-eerie-black">
          <div className="bg-bg-eerie-black text-white p-3 flex justify-between items-center cursor-pointer">
            <span className="font-semibold text-sm">PRICE</span>
            <span>⌃</span>
          </div>
          <div className="p-3 text-sm">
            <p className="text-gray-400 mb-3">The highest price is $50.00</p>
            <div className="flex justify-between items-center text-gray-400">
              {/* {isPriceOpen && ( */}
              <>
                <span></span>
                <span
                  className="cursor-pointer text-gray-300 text-xs hover:underline"
                  onClick={() => {
                    setIsLoadingLoadMore(true);
                    setPriceRange([0, 4000]);
                    setTimeout(() => {
                      setIsLoadingLoadMore(false);
                    }, 500);
                  }}
                >
                  Reset
                </span>
              </>
              {/* )} */}
            </div>
            <PriceOpenComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopFilters;
