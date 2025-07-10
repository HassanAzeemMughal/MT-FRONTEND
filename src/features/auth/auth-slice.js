import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(HYDRATE, (state, action) => {
    //   if (action.payload.auth) {
    //     return { ...state, ...action.payload.auth };
    //   }
    //   return state;
    // });
    builder.addCase(HYDRATE, (state, action) => {
      if (action.payload.auth) {
        return {
          ...state,
          ...action.payload.auth,
          isAuthenticated:
            state.isAuthenticated || action.payload.auth.isAuthenticated,
          user: state.user || action.payload.auth.user,
          token: state.token || action.payload.auth.token,
        };
      }
      return state;
    });
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
