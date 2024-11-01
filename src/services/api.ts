import { Product } from "features/products/products.types";

const API_BASE_URL = "https://dummyjson.com";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
