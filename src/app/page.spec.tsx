import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useAppDispatch, useAppSelector } from "appHooks";
import Home from "./page";
import { fetchProducts } from "features/products/products.actions";
import { addToCart } from "features/cart/cart.reducer";

jest.mock("../store/hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock("../store/features/products/products.actions", () => ({
  fetchProducts: jest.fn(),
}));

jest.mock("../store/features/cart/cart.reducer", () => ({
  addToCart: jest.fn(),
}));

jest.mock("../components/shared/Loader", () => () => <div>Loading...</div>);
jest.mock(
  "../components/shared/Error",
  () =>
    ({ retryAction }: { retryAction: () => void }) =>
      (
        <div>
          <p>Error occurred</p>
          <button onClick={retryAction}>Retry</button>
        </div>
      )
);
jest.mock(
  "../components/ui/ProductCard",
  () =>
    ({ addToCart }: { addToCart: () => void }) =>
      (
        <div>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      )
);
jest.mock(
  "../components/ui/LoadMore",
  () =>
    ({ onLoadMore }: { onLoadMore: () => void }) =>
      <button onClick={onLoadMore}>Load More</button>
);

const mockStore = configureStore([]);

describe("Home Page", () => {
  let store: ReturnType<typeof mockStore>;
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    store = mockStore({
      products: {
        data: {
          products: [],
          total: 0,
          skip: 0,
          limit: 10,
        },
        isLoading: false,
        error: null,
      },
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", async () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        products: {
          ...store.getState().products,
          isLoading: true,
        },
      })
    );

    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("Loading...")).toBeTruthy();
    });
  });

  it("renders error state and retries fetching products", async () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        products: {
          ...store.getState().products,
          error: "Some error occurred",
        },
      })
    );

    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    await waitFor(() => {
      expect(getByText("Error occurred")).toBeTruthy();
    });

    const retryButton = getByText("Retry");

    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        fetchProducts({ limit: 10, skip: 0 })
      );
    });
  });

  it("renders products when available", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product 1",
        price: 100,
        thumbnail: "image1.jpg",
        description: "Description 1",
      },
      {
        id: 2,
        title: "Product 2",
        price: 200,
        thumbnail: "image2.jpg",
        description: "Description 2",
      },
    ];

    store = mockStore({
      products: {
        data: {
          products: mockProducts,
          total: 2,
          skip: 0,
          limit: 10,
        },
        isLoading: false,
        error: null,
      },
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );

    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("A Supermarket In Your Pocket")).toBeTruthy();
      expect(getAllByText("Add to Cart").length).toBe(mockProducts.length);
    });
  });

  it("calls addToCart when product card button is clicked", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product 1",
        price: 100,
        thumbnail: "image1.jpg",
        description: "Description 1",
      },
    ];

    store = mockStore({
      products: {
        data: {
          products: mockProducts,
          total: 1,
          skip: 0,
          limit: 10,
        },
        isLoading: false,
        error: null,
      },
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );

    const { getByRole } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const addToCartButton = getByRole("button", {
      name: "Add to Cart",
    });
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        addToCart({
          id: 1,
          name: "Product 1",
          price: 100,
          quantity: 1,
          imageUrl: "image1.jpg",
        })
      );
    });
  });

  it("loads more products when the button is clicked", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product 1",
        price: 100,
        thumbnail: "image1.jpg",
        description: "Description 1",
      },
    ];

    store = mockStore({
      products: {
        data: {
          products: mockProducts,
          total: 5,
          skip: 1,
          limit: 1,
        },
        isLoading: false,
        error: null,
      },
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );

    const { getByRole } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const loadMoreButton = getByRole("button", { name: "Load More" });
    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        fetchProducts({ limit: 1, skip: 2 })
      );
    });
  });
});
