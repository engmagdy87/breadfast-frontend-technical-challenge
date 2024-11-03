import {
  selectCartItemsCount,
  selectCartTotalPrice,
  selectCartItems,
} from "./cart.selectors";
import type { Cart } from "./cart.types";

describe("Cart Selectors", () => {
  const mockCart: Cart = {
    data: [
      { id: 1, name: "Item 1", price: 100, quantity: 2, imageUrl: "url1" },
      { id: 2, name: "Item 2", price: 200, quantity: 1, imageUrl: "url2" },
    ],
  };

  const mockState = { cart: mockCart };

  describe("selectCartItemsCount", () => {
    it("should return the total count of items in the cart", () => {
      const itemCount = selectCartItemsCount(mockState);
      expect(itemCount).toBe(3);
    });

    it("should return 0 if the cart is empty", () => {
      const emptyState = { cart: { data: [] } };
      const itemCount = selectCartItemsCount(emptyState);
      expect(itemCount).toBe(0);
    });
  });

  describe("selectCartTotalPrice", () => {
    it("should return the total price of all items in the cart", () => {
      const totalPrice = selectCartTotalPrice(mockState);
      expect(totalPrice).toBe(400); // (100 * 2) + (200 * 1)
    });

    it("should return 0 if the cart is empty", () => {
      const emptyState = { cart: { data: [] } };
      const totalPrice = selectCartTotalPrice(emptyState);
      expect(totalPrice).toBe(0);
    });
  });

  describe("selectCartItems", () => {
    it("should return the list of cart items", () => {
      const items = selectCartItems(mockState);
      expect(items).toEqual(mockCart.data);
    });

    it("should return an empty array if the cart is empty", () => {
      const emptyState = { cart: { data: [] } };
      const items = selectCartItems(emptyState);
      expect(items).toEqual([]);
    });
  });
});
