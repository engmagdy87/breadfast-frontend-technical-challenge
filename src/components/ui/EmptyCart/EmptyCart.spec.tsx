import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import EmptyCart from ".";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../components/shared/InformativeScreen", () => ({
  __esModule: true,
  default: ({
    icon,
    iconAlt,
    title,
    subtitle,
    buttonText,
    buttonTestId,
    buttonAction,
  }: any) => (
    <div data-testid="informative-screen">
      <img src={icon} alt={iconAlt} data-testid="empty-cart-icon" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <button onClick={buttonAction} data-testid={buttonTestId}>
        {buttonText}
      </button>
    </div>
  ),
}));

describe("EmptyCart", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  describe("Rendering", () => {
    it("renders InformativeScreen with correct props", () => {
      render(<EmptyCart />);

      const icon = screen.getByTestId("empty-cart-icon");
      expect(icon).toHaveAttribute("src", "/empty-cart.png");
      expect(icon).toHaveAttribute("alt", "Empty cart icon");

      expect(screen.getByText("Ready to Start Shopping?")).toBeInTheDocument();
      expect(
        screen.getByText("Your cart is empty. Let's change that!")
      ).toBeInTheDocument();

      const button = screen.getByTestId("continue-shopping-btn");
      expect(button).toHaveTextContent("Continue Shopping");
    });

    it("renders all required elements", () => {
      render(<EmptyCart />);

      expect(screen.getByTestId("informative-screen")).toBeInTheDocument();
      expect(screen.getByTestId("continue-shopping-btn")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("navigates to home page when button is clicked", () => {
      render(<EmptyCart />);

      const button = screen.getByTestId("continue-shopping-btn");
      fireEvent.click(button);

      expect(mockPush).toHaveBeenCalledWith("/");
      expect(mockPush).toHaveBeenCalledTimes(1);
    });
  });

  describe("Props Validation", () => {
    it("passes correct props to InformativeScreen", () => {
      const { container } = render(<EmptyCart />);
      const informativeScreen = screen.getByTestId("informative-screen");

      expect(informativeScreen).toHaveAttribute(
        "data-testid",
        "informative-screen"
      );
      expect(screen.getByTestId("empty-cart-icon")).toBeInTheDocument();
      expect(screen.getByText("Ready to Start Shopping?")).toBeInTheDocument();
      expect(
        screen.getByText("Your cart is empty. Let's change that!")
      ).toBeInTheDocument();
      expect(screen.getByTestId("continue-shopping-btn")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has accessible button with correct text", () => {
      render(<EmptyCart />);

      const button = screen.getByRole("button", { name: "Continue Shopping" });
      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();
    });

    it("has accessible image with alt text", () => {
      render(<EmptyCart />);

      const image = screen.getByAltText("Empty cart icon");
      expect(image).toBeInTheDocument();
    });
  });
});
