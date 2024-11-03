import { renderHook } from "@testing-library/react-hooks";
import { useAppDispatch, useAppSelector } from ".";
import { RootState } from "..";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "features/products/products.reducer";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

const mockState: RootState = {
  products: {
    data: { products: [], total: 0, limit: 30, skip: 0 },
    isLoading: false,
    error: null,
  },
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe("Redux Hooks", () => {
  it("should return the typed dispatch function from useAppDispatch", () => {
    const { result } = renderHook(() => useAppDispatch(), { wrapper });

    expect(typeof result.current).toBe("function");
  });

  it("should return the typed state from useAppSelector", () => {
    const { result } = renderHook(
      () => useAppSelector((state) => state.products),
      { wrapper }
    );

    expect(result.current).toEqual(mockState.products);
  });
});
