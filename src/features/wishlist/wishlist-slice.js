const { createSlice } = require("@reduxjs/toolkit");
import { HYDRATE } from "next-redux-wrapper";
import { toast } from "react-toastify";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishlist(state, action) {
      const isInWishlist = state.wishlistItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (isInWishlist > -1) {
        toast.info("Product already in wishlist");
      } else {
        state.wishlistItems.push(action.payload);
        toast.success("Added To wishlist");
      }
    },
    deleteFromWishlist(state, action) {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
      toast.error("Removed From Wishlist");
    },
    deleteAllFromWishlist(state) {
      state.wishlistItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        // ...action.payload.wishlistItems,
        wishlistItems:
          action.payload.wishlist?.wishlistItems || state.wishlistItems,
      };
    });
  },
});

export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
