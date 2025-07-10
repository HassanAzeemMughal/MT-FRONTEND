// import { configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "../features/category/categorySlice";
// import categorySlugReducer from "../features/category/categorySlugSlice";
// import cartReducer from "../features/cart/cart-slice";

// export const store = configureStore({
//   reducer: {
//     category: categoryReducer,
//     categorySlug: categorySlugReducer,
//     cart: cartReducer,
//   },
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category/categorySlice";
import categorySlugReducer from "../features/category/categorySlugSlice";
import cartReducer from "../features/cart/cart-slice";
import authReducer from "../features/auth/auth-slice";
import wishlistReducer from "../features/wishlist/wishlist-slice";

// Load state from LocalStorage (Only on Browser)
const loadState = () => {
  if (typeof window === "undefined") return undefined;

  try {
    const authData = localStorage.getItem("auth");
    const cartData = localStorage.getItem("cart");
    const wishlistData = localStorage.getItem("wishlist");

    return {
      auth: authData ? JSON.parse(authData) : undefined,
      cart: cartData ? JSON.parse(cartData) : { cartItems: [] },
      wishlist: wishlistData ? JSON.parse(wishlistData) : { wishlistItems: [] },
    };
  } catch (error) {
    console.error("Error loading state from LocalStorage", error);
    return undefined;
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    categorySlug: categorySlugReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
  preloadedState,
});

// Save cart state to LocalStorage
if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      const state = store.getState();
      localStorage.setItem("auth", JSON.stringify(state.auth));
      localStorage.setItem(
        "cart",
        JSON.stringify({ cartItems: state.cart.cartItems })
      );
      localStorage.setItem(
        "wishlist",
        JSON.stringify({ wishlistItems: state.wishlist.wishlistItems })
      );
    } catch (error) {
      console.error("Error saving state to LocalStorage", error);
    }
  });
}

export default store;
