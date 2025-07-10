import Image from "next/image";
import React, { useState } from "react";
import { IoIosAdd, IoIosClose, IoIosRemove } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import NoImage from "../../../assets/no-image/no-image-icon.png";
import {
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "@/features/cart/cart-slice";
import RemoveItemModal from "./RemoveItemModal";
import { useRouter } from "next/navigation";

const CartOverLayModal = ({ setIsOpen, isOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isRemoveItemModal, setIsRemoveItemModal] = useState(true);
  const [productToRemove, setProductToRemove] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  let cartTotalPrice = 0;

  const handleRemoveItem = (product) => {
    setProductToRemove(product);
    setShowConfirm(true);
  };

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
    <div className="">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sliding Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl p-5 transform transition-transform z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-600"
        >
          ❌
        </button>
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cartItems.length > 0 ? (
          <div className="p-4 rounded-lg">
            <div className="max-h-96 overflow-y-auto">
              {cartItems.map((product, i) => {
                cartTotalPrice += product?.price * product?.quantity;

                return (
                  <div
                    className="flex items-center justify-between border-b pb-4 mb-4"
                    key={i}
                  >
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItem(product)}
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
                        <span className="font-medium">
                          {product?.quantity} x
                        </span>{" "}
                        <span className="text-red-500 font-bold">
                          £{product?.price}
                        </span>
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleDecreaseQuantity(product)}
                          className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                          <IoIosRemove />
                        </button>
                        <span className="mx-2 font-semibold">
                          {product?.quantity}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(product)}
                          className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                          <IoIosAdd />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* </CustomScroll> */}
            </div>
            {/* Subtotal */}
            <p className="flex justify-between text-lg font-semibold mt-4">
              <span>Subtotal:</span>
              <span className="text-red-500">£{cartTotalPrice.toFixed(2)}</span>
            </p>
            {/* Buttons */}
            <div className="mt-4">
              <div
                className="cursor-pointer px-4 py-2 bg-[#333] text-white text-center"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/cart");
                }}
              >
                View Cart
              </div>
              <div
                onClick={() => {
                  setIsOpen(false);
                  router.push("/checkout");
                }}
                className="px-4 py-2 bg-[#333] text-white mt-4 text-center cursor-pointer"
              >
                Checkout
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No items found in cart</p>
        )}
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

export default CartOverLayModal;
