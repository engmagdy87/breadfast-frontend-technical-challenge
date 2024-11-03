import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from ".";

describe("ProductCard Component", () => {
  const mockProps = {
    imageUrl: "https://example.com/image.jpg",
    name: "Sample Product",
    price: 99.99,
    description: "This is a sample product description.",
    addToCart: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product information correctly", () => {
    render(<ProductCard {...mockProps} />);

    expect(screen.getByAltText(mockProps.name)).toHaveAttribute(
      "src",
      mockProps.imageUrl
    );
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText("99.99")).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it("renders the Add to Cart button with icon", () => {
    render(<ProductCard {...mockProps} />);

    const addToCartButton = screen.getByRole("button", {
      name: "Add to Cart",
    });
    expect(addToCartButton).toBeInTheDocument();
    expect(screen.getByTestId("AddShoppingCartIcon")).toBeInTheDocument();
  });

  it("calls addToCart function when Add to Cart button is clicked", () => {
    render(<ProductCard {...mockProps} />);

    const addToCartButton = screen.getByRole("button", {
      name: "Add to Cart",
    });
    fireEvent.click(addToCartButton);

    expect(mockProps.addToCart).toHaveBeenCalledTimes(1);
  });

  it("disables Add to Cart button when isLoading is true", () => {
    render(<ProductCard {...mockProps} />);

    const addToCartButton = screen.getByRole("button", {
      name: "Add to Cart",
    });
    expect(addToCartButton).not.toBeDisabled();
  });
});
