import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "features/cart/cart.types";

const initialState: Cart = {
  data: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.data.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.data.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.data.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.data = state.data.filter((item) => item.id !== action.payload);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
