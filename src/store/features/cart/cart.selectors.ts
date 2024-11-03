import type { Cart } from "features/cart/cart.types";

export const selectCartItemsCount = (state: { cart: Cart }) =>
  state.cart.data.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: { cart: Cart }) =>
  state.cart.data.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const selectCartItems = (state: { cart: Cart }) => state.cart.data;
