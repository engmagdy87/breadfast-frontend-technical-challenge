import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ limit = 0, skip = 0 }: { limit: number; skip: number }) => {
    try {
      const response = await axios.get(
        `${apiUrl}/products?limit=${limit}&skip=${skip}&select=id,thumbnail,title,price,description`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch products"
        );
      } else {
        throw new Error("Failed to fetch products");
      }
    }
  }
);
