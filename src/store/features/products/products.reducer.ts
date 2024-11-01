import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { fetchProducts } from "./products.actions";
import {
  FetchProductsResponse,
  Products,
} from "features/products/products.types";

const initialState: Products = {
  data: { products: [], total: 0, limit: 30, skip: 0 },
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<FetchProductsResponse>) => {
        const { products, total, limit, skip } = action.payload;

        state.data = {
          ...state.data,
          products: [...state.data.products, ...products],
          total,
          limit,
          skip,
        };
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const productsReducer = productsSlice.reducer;
