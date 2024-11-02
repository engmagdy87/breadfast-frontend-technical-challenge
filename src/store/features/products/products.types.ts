import { SerializedError } from "@reduxjs/toolkit";

export type Products = {
  data: ProductsData;
  isLoading: boolean;
  error: SerializedError | null;
};

export type ProductsData = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export type FetchProductsResponse = ProductsData;
