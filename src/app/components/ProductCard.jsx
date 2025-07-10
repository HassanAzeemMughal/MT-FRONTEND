import { Card, Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import NoImage from "../../assets/no-image/no-image-icon.png";
import { addToCart } from "../../features/cart/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";
import { MdCompareArrows } from "react-icons/md";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/features/wishlist/wishlist-slice";

const ProductCard = ({ categoryRelateProducts }) => {
  const dispatch = useDispatch();
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
        {categoryRelateProducts.map((item, index) => {
          const wishlistItem = wishlistItems.find(
            (wishlistItem) => wishlistItem._id === item._id
          );
          return (
            <div key={index} className="bg-bg-eerie-black p-4 shadow-lg w-90">
              {/* Discount Badge */}
              <div className="relative">
                {item.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-bg-red text-white text-xs font-bold px-2 py-1 rounded">
                    -{item.discount}%
                  </span>
                )}

                {Array.isArray(item?.images) && item?.images?.length > 0 ? (
                  <img
                    src={`${backendUrl}${item.images[0]}`}
                    alt="Product Image"
                    className="w-full h-[300px] rounded-md"
                  />
                ) : (
                  <Image
                    src={NoImage}
                    alt="No Image Available"
                    className="w-full h-[300px] rounded-md"
                  />
                )}
              </div>
              <div className="bg-bg-red mt-3">
                <h1
                  className="cursor-pointer text-white text-center font-semibold"
                  onClick={() => handleAddToCart(item)}
                >
                  Add To Cart
                </h1>
              </div>
              {/* Product Details */}
              <div className="mt-2 text-white">
                <h3 className="font-bold text-lg">{item?.name}</h3>
                {/* Rating */}
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <FaStar
                      key={index}
                      className={`h-4 w-4 ${
                        index <= 3 ? "text-white" : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
                {/* Price */}
                <div className="mt-2">
                  {item?.discount > 0 && item?.offerPrice ? (
                    <>
                      <span className="text-gray-400 line-through ml-2">
                        ${item.price}
                      </span>
                      <span className="text-bg-blue text-xl font-bold ms-2">
                        ${item.offerPrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-bg-blue text-xl font-bold">
                      ${item.price}
                    </span>
                  )}
                </div>
                {/* Color Options */}
                <div className="mt-3 flex gap-2">
                  <span className="w-4 h-4 bg-gray-300 rounded-full border"></span>
                  <span className="w-4 h-4 bg-black rounded-full border"></span>
                </div>
                {/* Icons */}
                <div className="mt-5 flex item-center justify-center text-gray-400 text-lg gap-5">
                  <span
                    className={`${
                      wishlistItem !== undefined ? "active" : ""
                    } cursor-pointer`}
                    onClick={
                      wishlistItem !== undefined
                        ? () => dispatch(deleteFromWishlist(item._id))
                        : () => dispatch(addToWishlist(item))
                    }
                  >
                    {/* <LuHeart color="#cb3f3f" /> */}
                    {wishlistItem !== undefined ? (
                      <FaHeart color="#cb3f3f" />
                    ) : (
                      <LuHeart color="#cb3f3f" />
                    )}
                  </span>
                  <span className="cursor-pointer">
                    <MdCompareArrows color="#cb3f3f" />
                  </span>
                  <span className="cursor-pointer">
                    <FiShoppingCart color="#cb3f3f" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <Row gutter={[30, 30]}>
        {categoryRelateProducts?.map((item, index) => (
          <Col key={index} xl={8} lg={8} md={8} sm={12} xs={24}>
            <div className="group relative">
              <Card className="h-[440px] bg-[#f8f8f8] overflow-hidden relative">
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaShoppingCart
                    fill="#999999"
                    className="h-5 w-5 cursor-pointer hover:fill-[#cc2121]"
                  />
                  <FaHeart
                    fill="#999999"
                    className="h-5 w-5 cursor-pointer hover:fill-[#cc2121]"
                  />
                  <IoSearch
                    fill="#999999"
                    className="h-5 w-5 cursor-pointer hover:fill-[#cc2121]"
                  />
                </div>

                <div className="h-[295px] flex items-center justify-center">
                  {Array.isArray(item?.images) && item?.images?.length > 0 ? (
                    <img
                      src={`${backendUrl}${item.images[0]}`}
                      alt="Product Image"
                      className="h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={NoImage}
                      alt="No Image Available"
                      className="h-full object-contain"
                    />
                  )}
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-1">
                    <FaStar fill="#ffa200" />
                    <FaStar fill="#ffa200" />
                    <FaStar fill="#ffa200" />
                    <FaStar fill="#ffa200" />
                    <FaStar fill="#dddddd" />
                  </div>
                  <h1 className="text-text-800 font-[16px] font-medium pt-1">
                    {item?.name}
                  </h1>
                  {item?.offerPrice ? (
                    <>
                      <span className="font-[18px] font-bold">
                        ${item?.offerPrice}
                      </span>
                      <del className="text-text-800 ms-2">
                        <span className="text-text-800 font-[14px]">
                          ${item?.price}
                        </span>
                      </del>
                    </>
                  ) : (
                    <span className="font-[18px] font-bold">
                      ${item?.price}
                    </span>
                  )}
                </div>

                <button
                  className="mt-2 w-full bg-[#cc2121] text-white py-2 rounded-md font-semibold 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </Card>
            </div>
          </Col>
        ))}
      </Row> */}
    </>
  );
};

export default ProductCard;
