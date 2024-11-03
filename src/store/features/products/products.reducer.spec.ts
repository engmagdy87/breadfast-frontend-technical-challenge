import { productsReducer } from "./products.reducer";
import { fetchProducts } from "./products.actions";
import type { FetchProductsResponse } from "features/products/products.types";

describe("productsSlice reducer", () => {
  const initialState = {
    data: { products: [], total: 0, limit: 30, skip: 0 },
    isLoading: false,
    error: null,
  };

  it("should handle initial state", () => {
    expect(productsReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should set isLoading to true and clear error on fetchProducts pending", () => {
    const action = fetchProducts.pending;
    const state = productsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle fetchProducts fulfilled", () => {
    const action: { payload: FetchProductsResponse } = {
      type: fetchProducts.fulfilled.type,
      payload: {
        products: [
          {
            id: 1,
            thumbnail: "img1.jpg",
            title: "Product 1",
            price: 100,
            description: "Desc 1",
          },
          {
            id: 2,
            thumbnail: "img2.jpg",
            title: "Product 2",
            price: 200,
            description: "Desc 2",
          },
        ],
        total: 2,
        limit: 30,
        skip: 0,
      },
    };

    const state = productsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.data.products).toHaveLength(2);
    expect(state.data.products[0]).toEqual(action.payload.products[0]);
    expect(state.data.total).toBe(2);
  });

  it("should handle fetchProducts rejected", () => {
    const action = {
      type: fetchProducts.rejected.type,
      error: { message: "Failed to fetch products" },
    };

    const state = productsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(action.error);
  });
});
