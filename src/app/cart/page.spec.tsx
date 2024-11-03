import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useMediaQuery } from "@mui/material";
import { useAppDispatch } from "appHooks";
import Cart from "./page";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "features/cart/cart.reducer";
import { CartItem as CartItemType } from "features/cart/cart.types";

jest.mock("../../store/hooks", () => ({
  useAppSelector: jest.requireActual("../../store/hooks").useAppSelector,
  useAppDispatch: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

jest.mock("../../store/features/cart/cart.reducer", () => ({
  addToCart: jest.fn(),
  decreaseQuantity: jest.fn(),
  removeFromCart: jest.fn(),
}));

const mockStore = configureStore([]);
const mockCartItems: CartItemType[] = [
  {
    id: 1,
    name: "Item 1",
    quantity: 2,
    price: 100,
    imageUrl: "image url",
  },
];

describe("Cart Page", () => {
  let store: ReturnType<typeof mockStore>;
  let dispatch: jest.Mock;

  beforeEach(() => {
    store = mockStore({
      cart: {
        data: mockCartItems,
      },
    });

    (useMediaQuery as jest.Mock).mockReturnValue(false);

    dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders EmptyCart when there are no items", async () => {
    store = mockStore({
      cart: {
        data: [],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("Ready to Start Shopping?")).toBeTruthy();
    });
  });

  it("renders CartItem and OrderSummary when there are items", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("Item 1")).toBeTruthy();
      expect(getByText("200.00 EGP")).toBeTruthy();
    });
  });

  it("calls addToCart when increment button is clicked", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const incrementButton = getByTestId("increment");
    fireEvent.click(incrementButton);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(addToCart(mockCartItems[0]));
    });
  });

  it("calls decreaseQuantity when decrement button is clicked", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const decrementButton = getByTestId("decrement");
    fireEvent.click(decrementButton);

    await waitFor(() => {
      expect(decreaseQuantity).toHaveBeenCalledWith(mockCartItems[0].id);
    });
  });

  it("calls removeFromCart when remove button is clicked", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const removeButton = getByTestId("remove");
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(removeFromCart).toHaveBeenCalledWith(mockCartItems[0].id);
    });
  });
});
