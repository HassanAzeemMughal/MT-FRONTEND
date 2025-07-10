import Image from "next/image";
import React from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import NoImage from "../../../assets/no-image/no-image-icon.png";
import { deleteFromWishlist } from "@/features/wishlist/wishlist-slice";
import { useRouter } from "next/navigation";

const WishlistOverLayModal = ({ setWishlistIsOpen, isWishlistOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="">
      {/* Overlay */}
      {isWishlistOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity z-40"
          onClick={() => setWishlistIsOpen(false)}
        ></div>
      )}

      {/* Sliding Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl p-5 transform transition-transform z-50 ${
          isWishlistOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setWishlistIsOpen(false)}
          className="absolute top-4 right-4 text-gray-600"
        >
          ❌
        </button>
        <h2 className="text-xl font-bold mb-4">WishList</h2>
        {wishlistItems.length > 0 ? (
          <div className="p-4 rounded-lg">
            <div className="max-h-96 overflow-y-auto">
              {wishlistItems.map((product, i) => {
                return (
                  <div
                    className="flex items-center justify-between border-b pb-4 mb-4"
                    key={i}
                  >
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => dispatch(deleteFromWishlist(product._id))}
                    >
                      <IoIosClose size={24} />
                    </button>
                    <div className="w-16 h-16 flex-shrink-0">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={`${backendUrl}${product.images[0]}`}
                          className="w-full h-full object-cover rounded-md"
                          alt="Product"
                        />
                      ) : (
                        <Image
                          src={NoImage}
                          className="w-full h-full object-cover rounded-md"
                          alt="No Image"
                        />
                      )}
                    </div>
                    <div className="flex-1 px-4">
                      <h5 className="text-lg font-semibold">{product?.name}</h5>
                      <p className="text-gray-600">
                        {product?.discount > 0 && product?.offerPrice ? (
                          <>
                            <span className="text-red-500 font-bold">
                              ${product.offerPrice}
                            </span>
                          </>
                        ) : (
                          <span className="text-red-500 font-bold">
                            ${product.price}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
              {/* </CustomScroll> */}
            </div>
            {/* Buttons */}
            <div className="mt-4">
              <div
                onClick={() => {
                  setWishlistIsOpen(false);
                  router.push("/wishlist");
                }}
                className="px-4 py-2 bg-[#333] text-white text-center"
              >
                View Wishlist
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No items found in wishlist
          </p>
        )}
      </div>
    </div>
  );
};

export default WishlistOverLayModal;
