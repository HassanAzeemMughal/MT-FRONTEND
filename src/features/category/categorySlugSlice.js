import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching subcategory data
export const fetchCategorySlugData = createAsyncThunk(
  "categorySlug/fetchCategorySlugData",
  async ({ categSlug }, { rejectWithValue, dispatch }) => {
    dispatch(clearCategorySlugData());

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/api/v1/categories/${categSlug}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to fetch category data"
        );
      }

      const result = await response.json();

      // Ensure the structure contains category and products
      const { data } = result;
      if (!data || !data.category || !data.products) {
        throw new Error(
          "Invalid response structure: Missing category or products"
        );
      }

      return { categSlug, data };
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching category data");
    }
  }
);

const categorySlugSlice = createSlice({
  name: "categorySlug",
  initialState: {
    data: {},
    loading: {},
    error: {},
  },
  reducers: {
    clearCategorySlugData: (state) => {
      state.data = {};
      state.loading = {};
      state.error = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorySlugData.pending, (state, action) => {
        const { categSlug } = action.meta.arg;
        const key = `${categSlug}`;
        state.loading[key] = true;
        state.error[key] = null;
      })
      .addCase(fetchCategorySlugData.fulfilled, (state, action) => {
        const { categSlug, data } = action.payload;
        const key = `${categSlug}`;

        if (!state.data) state.data = {};

        state.data[key] = data;
        state.loading[key] = false;
      })
      .addCase(fetchCategorySlugData.rejected, (state, action) => {
        const { categSlug } = action.meta.arg;
        const key = `${categSlug}`;
        state.loading[key] = false;
        state.error[key] = action.payload;
      });
  },
});

export const { clearCategorySlugData } = categorySlugSlice.actions;
export default categorySlugSlice.reducer;
