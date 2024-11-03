import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "utils/theme";
import OrderSummary from ".";
import { useMediaQuery } from "@mui/material";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("OrderSummary Component", () => {
  const totalPrice = 100;

  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Order Summary with correct pricing", () => {
    render(
      <ThemeProvider theme={theme}>
        <OrderSummary totalPrice={totalPrice} />
      </ThemeProvider>
    );

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("Items:")).toBeInTheDocument();
    expect(screen.getByText("100.00 EGP")).toBeInTheDocument();
    expect(screen.getByText("Delivery:")).toBeInTheDocument();
    expect(screen.getByText("20 EGP")).toBeInTheDocument();
    expect(screen.getByText("Total Price:")).toBeInTheDocument();
    expect(screen.getByText("120.00 EGP")).toBeInTheDocument();
  });

  it("renders mobile styles and typography when isMobileOrTablet is true", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(
      <ThemeProvider theme={theme}>
        <OrderSummary totalPrice={totalPrice} />
      </ThemeProvider>
    );

    expect(screen.getByText("Order Summary").tagName).toBe("H6");
    expect(screen.getByRole("button")).toHaveClass("MuiButton-sizeMedium");
  });

  it("renders desktop styles and typography when isMobileOrTablet is false", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(
      <ThemeProvider theme={theme}>
        <OrderSummary totalPrice={totalPrice} />
      </ThemeProvider>
    );

    expect(screen.getByText("Order Summary").tagName).toBe("H5");
    expect(screen.getByRole("button")).toHaveClass("MuiButton-sizeLarge");
  });

  it("displays Place Order button with correct color and size", () => {
    render(
      <ThemeProvider theme={theme}>
        <OrderSummary totalPrice={totalPrice} />
      </ThemeProvider>
    );

    const placeOrderButton = screen.getByRole("button", {
      name: "Place Order",
    });
    expect(placeOrderButton).toHaveTextContent("Place Order");
    expect(placeOrderButton).toHaveClass("MuiButton-containedPrimary");
  });
});
