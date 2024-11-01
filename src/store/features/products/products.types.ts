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
  category: Category;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: AvailabilityStatus;
  reviews: Review[];
  returnPolicy: ReturnPolicy;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
};

export type AvailabilityStatus = "Low Stock" | "In Stock";

export type Category = "beauty" | "fragrances" | "furniture" | "groceries";

export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export type Meta = {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
};

export type ReturnPolicy =
  | "30 days return policy"
  | "60 days return policy"
  | "90 days return policy"
  | "No return policy"
  | "7 days return policy";

export type Review = {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
};

export type FetchProductsResponse = ProductsData;
