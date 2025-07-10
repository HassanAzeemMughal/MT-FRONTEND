import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { createSlice } = require("@reduxjs/toolkit");
import { HYDRATE } from "next-redux-wrapper";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      const cartItem = state.cartItems.find((item) => item._id === product._id);

      // Check if offerPrice is available; otherwise, use price
      const finalPrice = product.offerPrice ?? product.price;

      if (!cartItem) {
        state.cartItems.push({
          ...product,
          quantity: 1,
          price: finalPrice, // Use offerPrice if available, otherwise price
          cartItemId: uuidv4(),
        });
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success("Added To Cart");
    },

    increaseQuantity(state, action) {
      const product = action.payload;
      const cartItem = state.cartItems.find(
        (item) => item.cartItemId === product.cartItemId
      );

      if (cartItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast.success("Item Incremented in cart");
      } else {
        toast.error("Item not found in cart");
      }
    },

    deleteFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.cartItemId !== action.payload
      );
      toast.error("Removed From Cart");
    },

    decreaseQuantity(state, action) {
      const product = action.payload;
      const cartItem = state.cartItems.find(
        (item) => item.cartItemId === product.cartItemId
      );

      if (cartItem && cartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.cartItemId !== cartItem.cartItemId
        );
        toast.error("Removed From Cart");
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        toast.warn("Item Decremented From Cart");
      }
    },

    deleteAllFromCart(state) {
      state.cartItems = [];
      toast.error("Cart Cleared");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.cartItems,
      };
    });
  },
});

export const {
  addToCart,
  increaseQuantity,
  deleteFromCart,
  decreaseQuantity,
  deleteAllFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
