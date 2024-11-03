import { productsSelector } from "./products.selectors";
import { RootState } from "../..";

describe("productsSelector", () => {
  it("should return the products state", () => {
    const mockState: RootState = {
      products: {
        data: { products: [], total: 0, limit: 30, skip: 0 },
        isLoading: false,
        error: null,
      },
    };

    const result = productsSelector(mockState);

    expect(result).toEqual(mockState.products);
  });
});
