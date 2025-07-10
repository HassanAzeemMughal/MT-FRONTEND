import React, { useEffect, useState } from "react";
import { getApi } from "@/services/ApiService";
import Image from "next/image";
import { FaHeart, FaStar } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { MdCompareArrows } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import NoImage from "../../assets/no-image/no-image-icon.png";
import { addToCart } from "@/features/cart/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/features/wishlist/wishlist-slice";

const TrendingProduct = () => {
  const dispatch = useDispatch();
  const [trendingProduct, setTrendingProduct] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  const { wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    fetchTrendingData();
  }, []);

  const fetchTrendingData = async () => {
    try {
      const response = await getApi("/products/fetch/trending/product");
      if (response.success === "true") {
        setTrendingProduct(response.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div>
        <h1 className="text-white text-4xl">TRENDING PRODUCTS</h1>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20">
          {trendingProduct.slice(0, 8).map((item, index) => {
            const wishlistItem = wishlistItems.find(
              (wishlistItem) => wishlistItem._id === item._id
            );
            return (
              <div key={index} className="bg-bg-eerie-black p-4 shadow-lg w-90">
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
                <div className="mt-2 text-white">
                  <h3 className="font-bold text-lg">{item?.name}</h3>
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
                  <div className="mt-3 flex gap-2">
                    <span className="w-4 h-4 bg-gray-300 rounded-full border"></span>
                    <span className="w-4 h-4 bg-black rounded-full border"></span>
                  </div>
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
      </div>
    </>
  );
};

export default TrendingProduct;
