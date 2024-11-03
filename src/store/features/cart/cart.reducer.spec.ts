import {
  cartReducer,
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "./cart.reducer";
import type { Cart, CartItem } from "./cart.types";

describe("cartReducer", () => {
  const initialState: Cart = { data: [] };

  const sampleItem: CartItem = {
    id: 1,
    name: "Sample Product",
    price: 100,
    quantity: 1,
    imageUrl: "sample-url",
  };

  it("should return the initial state", () => {
    const result = cartReducer(undefined, { type: undefined });
    expect(result).toEqual(initialState);
  });

  describe("addToCart", () => {
    it("should add a new item to the cart if it does not already exist", () => {
      const action = addToCart(sampleItem);
      const state = cartReducer(initialState, action);
      expect(state.data).toHaveLength(1);
      expect(state.data[0]).toEqual({ ...sampleItem, quantity: 1 });
    });

    it("should increase the quantity of an existing item", () => {
      const stateWithItem = { data: [{ ...sampleItem, quantity: 1 }] };
      const action = addToCart(sampleItem);
      const state = cartReducer(stateWithItem, action);
      expect(state.data).toHaveLength(1);
      expect(state.data[0].quantity).toBe(2);
    });
  });

  describe("removeFromCart", () => {
    it("should remove an item from the cart by id", () => {
      const stateWithItem = { data: [{ ...sampleItem, quantity: 1 }] };
      const action = removeFromCart(sampleItem.id);
      const state = cartReducer(stateWithItem, action);
      expect(state.data).toHaveLength(0);
    });

    it("should do nothing if the item id is not found", () => {
      const stateWithItem = { data: [{ ...sampleItem, quantity: 1 }] };
      const action = removeFromCart(2); // ID that does not exist
      const state = cartReducer(stateWithItem, action);
      expect(state.data).toHaveLength(1);
      expect(state.data[0]).toEqual({ ...sampleItem, quantity: 1 });
    });
  });

  describe("decreaseQuantity", () => {
    it("should decrease the quantity of an existing item by 1", () => {
      const stateWithItem = { data: [{ ...sampleItem, quantity: 2 }] };
      const action = decreaseQuantity(sampleItem.id);
      const state = cartReducer(stateWithItem, action);
      expect(state.data).toHaveLength(1);
      expect(state.data[0].quantity).toBe(1);
    });

    it("should remove the item if the quantity becomes less than 1", () => {
      const stateWithItem = { data: [{ ...sampleItem, quantity: 1 }] };
      const action = decreaseQuantity(sampleItem.id);
      const state = cartReducer(stateWithItem, action);
      expect(state.data).toHaveLength(0);
    });

    it("should do nothing if the item id is not found", () => {
      const stateWithItem = { data: [{ ...sampleItem, quantity: 1 }] };
      const action = decreaseQuantity(2); // ID that does not exist
      const state = cartReducer(stateWithItem, action);
      expect(state.data).toHaveLength(1);
      expect(state.data[0]).toEqual({ ...sampleItem, quantity: 1 });
    });
  });
});
