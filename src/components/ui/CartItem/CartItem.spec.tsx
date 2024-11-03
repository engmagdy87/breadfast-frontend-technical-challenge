import { render, screen, fireEvent } from "@testing-library/react";
import { useMediaQuery } from "@mui/material";
import CartItem from ".";
import type { CartItem as CartItemType } from "features/cart/cart.types";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
  useTheme: jest.fn(() => ({
    breakpoints: {
      down: jest.fn(),
    },
  })),
}));

describe("CartItem", () => {
  const mockItem: CartItemType = {
    id: 1,
    name: "Test Product",
    price: 99.99,
    quantity: 2,
    imageUrl: "test-image.jpg",
  };

  const mockProps = {
    data: mockItem,
    onIncrementQuantity: jest.fn(),
    onDecrementQuantity: jest.fn(),
    onRemove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Desktop Layout", () => {
    beforeEach(() => {
      (useMediaQuery as jest.Mock).mockReturnValue(false);
    });

    it("renders product details correctly", () => {
      render(<CartItem {...mockProps} />);

      expect(screen.getByText(mockItem.name)).toBeInTheDocument();
      expect(screen.getByText("99.99")).toBeInTheDocument();
      expect(screen.getByText("EGP")).toBeInTheDocument();
      expect(screen.getByText("Total: 199.98 EGP")).toBeInTheDocument();

      const image = screen.getByAltText(mockItem.name);
      expect(image).toHaveAttribute("src", mockItem.imageUrl);
      expect(image).toBeInTheDocument();
    });

    it("has correct desktop layout styles", () => {
      render(<CartItem {...mockProps} />);

      const image = screen.getByAltText(mockItem.name);
      expect(image).toHaveStyle({
        width: "120px",
        height: "120px",
      });
    });
  });

  describe("Mobile Layout", () => {
    beforeEach(() => {
      (useMediaQuery as jest.Mock).mockReturnValue(true);
    });

    it("has correct mobile layout styles", () => {
      render(<CartItem {...mockProps} />);

      const image = screen.getByAltText(mockItem.name);
      expect(image).toHaveStyle({
        width: "100%",
        height: "200px",
      });
    });
  });

  describe("Quantity Controls", () => {
    it("handles increment correctly", () => {
      render(<CartItem {...mockProps} />);

      const incrementButton = screen.getByTestId("increment");
      fireEvent.click(incrementButton);

      expect(mockProps.onIncrementQuantity).toHaveBeenCalledWith(mockItem);
    });

    it("handles decrement correctly when quantity > 1", () => {
      render(<CartItem {...mockProps} />);

      const decrementButton = screen.getByTestId("decrement");
      fireEvent.click(decrementButton);

      expect(mockProps.onDecrementQuantity).toHaveBeenCalledWith(mockItem);
    });

    it("disables decrement button when quantity is 1", () => {
      const itemWithQuantityOne = {
        ...mockProps,
        data: { ...mockItem, quantity: 1 },
      };

      render(<CartItem {...itemWithQuantityOne} />);

      const decrementButton = screen.getByTestId("decrement");
      expect(decrementButton).toBeDisabled();

      fireEvent.click(decrementButton);
      expect(mockProps.onDecrementQuantity).not.toHaveBeenCalled();
    });

    it("displays correct quantity", () => {
      render(<CartItem {...mockProps} />);

      expect(
        screen.getByText(mockItem.quantity.toString())
      ).toBeInTheDocument();
    });
  });

  describe("Remove Functionality", () => {
    it("handles remove action correctly", () => {
      render(<CartItem {...mockProps} />);

      const removeButton = screen.getByTestId("remove");
      fireEvent.click(removeButton);

      expect(mockProps.onRemove).toHaveBeenCalledWith(mockItem.id);
    });
  });

  describe("Price Calculations", () => {
    it("displays correct unit price", () => {
      render(<CartItem {...mockProps} />);

      expect(screen.getByText("99.99")).toBeInTheDocument();
    });

    it("displays correct total price", () => {
      render(<CartItem {...mockProps} />);

      const totalPrice = (mockItem.price * mockItem.quantity).toFixed(2);
      expect(screen.getByText(`Total: ${totalPrice} EGP`)).toBeInTheDocument();
    });
  });
});
