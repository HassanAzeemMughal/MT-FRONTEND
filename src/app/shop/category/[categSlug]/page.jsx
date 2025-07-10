"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Row, Slider, Card } from "antd";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import SpeakerIcon from "../../../../assets/images/speaker.png";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorySlugData } from "@/features/category/categorySlugSlice";
import { useParams } from "next/navigation";
import LoaderOverlay from "@/components/LoaderOverlay/LoaderOverlay";
import ShopFilters from "@/app/components/ShopFilters";
import HeaderBannerImage from "../../../../assets/banner-image/header-banner.webp";
import ProductCard from "@/app/components/ProductCard";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const categSlug = params?.categSlug;
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortOption, setSortOption] = useState("");

  const { data, loading } = useSelector((state) => state.categorySlug);
  const key = `${categSlug}`;
  const category = data?.[key]?.category || null;
  const siblingCategories = data?.[key]?.siblingCategories || [];
  const categoryRelateProducts = data?.[key]?.products || [];
  const isLoading = loading?.[key] || false;

  useEffect(() => {
    setIsLoadingLoadMore(true);
    if (categSlug) {
      dispatch(fetchCategorySlugData({ categSlug })).finally(() => {
        setIsLoadingLoadMore(false);
      });
    }
  }, [categSlug, dispatch]);

  const visibleProducts = useMemo(
    () => categoryRelateProducts.slice(0, visibleCount),
    [categoryRelateProducts, visibleCount]
  );

  const filteredProducts = useMemo(() => {
    let products = visibleProducts.filter((product) => {
      // Use offerPrice if available, otherwise use price
      const productPrice = product.offerPrice ?? product.price ?? 0;

      return (
        (!selectedColor || product.color === selectedColor) &&
        (!selectedSize || product.size === selectedSize) &&
        productPrice >= priceRange[0] &&
        productPrice <= priceRange[1] // Filter by price
      );
    });

    // Apply sorting after filtering
    if (sortOption === "lowToHigh") {
      products.sort(
        (a, b) =>
          (a.offerPrice ?? a.price ?? 0) - (b.offerPrice ?? b.price ?? 0)
      );
    } else if (sortOption === "highToLow") {
      products.sort(
        (a, b) =>
          (b.offerPrice ?? b.price ?? 0) - (a.offerPrice ?? a.price ?? 0)
      );
    }

    return products;
  }, [selectedColor, selectedSize, priceRange, visibleProducts, sortOption]); // Added sortOption as a dependency

  const handleLoadMore = () => {
    setIsLoadingLoadMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setIsLoadingLoadMore(false);
    }, 1000);
  };

  const products = [
    {
      imageSrc: SpeakerIcon,
      title: "sleeveless dress",
      price: 290,
      rating: 4,
    },
    {
      imageSrc: SpeakerIcon,
      title: "maxi dress",
      price: 266,
      rating: 4,
    },
    {
      imageSrc: SpeakerIcon,
      title: "mini dress",
      price: 285,
      rating: 4,
    },
    {
      imageSrc: SpeakerIcon,
      title: "floral dress",
      price: 300,
      rating: 5,
    },
    {
      imageSrc: SpeakerIcon,
      title: "striped dress",
      price: 275,
      rating: 3,
    },
  ];

  const productsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + productsPerPage < products.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - productsPerPage >= 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  // const LatestProductCard = ({ products }) => (
  //   <div>
  //     {products
  //       .slice(currentIndex, currentIndex + productsPerPage)
  //       .map((item, index) => (
  //         <div key={index} className="flex items-center space-x-4 py-3">
  //           <div className="w-[120px] h-36 bg-[#f8f8f8] flex items-center justify-center">
  //             <Image
  //               src={item.imageSrc}
  //               alt={item.title}
  //               className="object-contain h-30"
  //             />
  //           </div>
  //           <div>
  //             <div className="flex items-center space-x-1">
  //               {[...Array(5)].map((_, starIndex) => (
  //                 <FaStar
  //                   key={starIndex}
  //                   className={`text-[#ffa200] ${
  //                     starIndex < item.rating ? "fill-current" : "opacity-50"
  //                   }`}
  //                 />
  //               ))}
  //             </div>
  //             <p className="text-gray-500 text-sm mt-1">{item.title}</p>
  //             <p className="text-black font-bold text-lg mt-1">${item.price}</p>
  //           </div>
  //         </div>
  //       ))}
  //   </div>
  // );

  return (
    <div className="">
      {isLoadingLoadMore && <LoaderOverlay />}
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
        <span className="text-[16px] font-semibold text-white">COLLECTION</span>
        <span className="text-[16px] font-semibold text-white">
          HOME / COLLECTION
        </span>
      </div>
      <div className="px-20 py-20">
        <Row gutter={[30, 30]}>
          <Col xl={6} lg={6} md={6}>
            <div>
              <ShopFilters
                setIsLoadingLoadMore={setIsLoadingLoadMore}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                setSelectedSize={setSelectedSize}
                selectedSize={selectedSize}
                categoryRelateProducts={visibleProducts}
                setIsCategoryOpen={setIsCategoryOpen}
                isCategoryOpen={isCategoryOpen}
                setIsColorsOpen={setIsColorsOpen}
                isColorsOpen={isColorsOpen}
                setIsSizeOpen={setIsSizeOpen}
                isSizeOpen={isSizeOpen}
                setIsPriceOpen={setIsPriceOpen}
                isPriceOpen={isPriceOpen}
                setPriceRange={setPriceRange}
                priceRange={priceRange}
              />
              {/* <div className="w-full max-w-md mx-auto py-5 bg-bg-eerie-black">
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] font-bold text-white">
                    NEW PRODUCT
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      aria-label="Previous products"
                      className="text-[#cc2121] disabled:opacity-50"
                    >
                      <FaChevronLeft size={20} />
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={
                        currentIndex + productsPerPage >= products.length
                      }
                      aria-label="Next products"
                      className="text-[#cc2121] disabled:opacity-50"
                    >
                      <FaChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <LatestProductCard products={products} />
              </div> */}
            </div>
          </Col>
          <Col xl={18} lg={18} md={18}>
            <div>
              <div className="bg-bg-eerie-black h-[300px] flex items-center px-12">
                <div className="flex-shrink-0">
                  <Image
                    src={SpeakerIcon}
                    alt="Fashion"
                    className="h-[250px] object-cover"
                  />
                </div>

                <div className="ml-16">
                  <h1 className="text-2xl font-semibold text-[#444444]">
                    STYLISH WOMEN'S FASHION
                  </h1>
                  <p className="text-lg text-text-800">
                    HAVE ALREADY PASSED A LEVEL OF BEING ATTRACTIVE
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-[16px]">APPLE IPHONE</h1>
                <p className="font-medium text-sm pt-1">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <p className="font-normal text-xs text-text-800 pt-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <div className="mt-7">
                <div className="flex justify-between items-center border border-gray-300 p-4">
                  {/* Showing Products Text */}
                  <div className="text-sm text-white">
                    Showing Products{" "}
                    {filteredProducts.length > 0
                      ? `1-${filteredProducts.length}`
                      : "0"}{" "}
                    of {categoryRelateProducts.length} Results
                  </div>

                  {/* Products per Page */}
                  <div className="flex items-center gap-5">
                    <div className="text-sm text-gray-700">
                      <select
                        className="ml-2 p-1 outline-none"
                        onChange={(e) => {
                          setIsLoadingLoadMore(true); // Show loader
                          setTimeout(() => {
                            setVisibleCount(Number(e.target.value)); // Update product count
                            setIsLoadingLoadMore(false); // Hide loader
                          }, 1000); // Adjust delay as needed
                        }}
                      >
                        <option value="12">12 Products Per Page</option>
                        <option value="20">20 Products Per Page</option>
                        <option value="50">50 Products Per Page</option>
                        <option value="100">100 Products Per Page</option>
                      </select>
                    </div>
                    |
                    <div className="text-sm text-gray-700">
                      <select
                        className="ml-2 p-1 outline-none"
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option>Sorting items</option>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-9">
                <ProductCard categoryRelateProducts={filteredProducts} />
              </div>
              {/* {visibleCount < filteredProducts.length && ( */}
              <div className="flex items-center justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="text-sm font-bold bg-text-700 text-white px-4 py-3"
                >
                  LOAD MORE
                </button>
              </div>
              {/* )} */}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CategoryPage;
