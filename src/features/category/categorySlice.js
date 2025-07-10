import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Clear category data action
export const clearCategoryData = createAsyncThunk(
  "category/clearData",
  async (_, { dispatch }) => {
    dispatch(categorySlice.actions.resetCategoryData());
  }
);

export const fetchCategoryData = createAsyncThunk(
  "category/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = `${apiUrl}/api/v1/categories/fetch`;

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to fetch category data"
        );
      }

      const result = await response.json();
      if (result.success === "true") {
        return { data: result.categories };
      }
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching categories");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: null, // Change to null or an array
    loading: false, // Boolean for loading state
    error: null, // Null for errors
  },
  reducers: {
    resetCategoryData: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Make sure to access data correctly
      })
      .addCase(fetchCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
