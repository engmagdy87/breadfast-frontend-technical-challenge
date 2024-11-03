import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Error from ".";

jest.mock("../../../components/shared/InformativeScreen", () => {
  return function MockInformativeScreen({
    icon,
    iconAlt,
    title,
    subtitle,
    buttonText,
    buttonTestId,
    buttonAction,
  }: {
    icon: string;
    iconAlt: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonTestId: string;
    buttonAction: () => void;
  }) {
    return (
      <div data-testid="informative-screen">
        <img src={icon} alt={iconAlt} data-testid="error-icon" />
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button data-testid={buttonTestId} onClick={buttonAction}>
          {buttonText}
        </button>
      </div>
    );
  };
});

describe("Error Component", () => {
  const mockRetryAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the InformativeScreen component with correct props", async () => {
    render(<Error retryAction={mockRetryAction} />);

    expect(screen.getByTestId("informative-screen")).toBeInTheDocument();

    const icon = screen.getByTestId("error-icon");
    expect(icon).toHaveAttribute("src", "/warning.png");
    expect(icon).toHaveAttribute("alt", "Warning icon");

    expect(screen.getByText("Something Went Wrong")).toBeInTheDocument();
    expect(screen.getByText("Please try again!")).toBeInTheDocument();

    const retryButton = screen.getByTestId("try-again-btn");
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveTextContent("Try Again");
  });

  it("calls retryAction when Try Again button is clicked", () => {
    render(<Error retryAction={mockRetryAction} />);

    fireEvent.click(screen.getByTestId("try-again-btn"));

    expect(mockRetryAction).toHaveBeenCalledTimes(1);
  });

  it("passes accessibility checks", () => {
    const { container } = render(<Error retryAction={mockRetryAction} />);

    const icon = screen.getByTestId("error-icon");
    expect(icon).toHaveAttribute("alt");

    const button = screen.getByTestId("try-again-btn");
    expect(button).toBeEnabled();
  });

  it("matches snapshot", () => {
    const { container } = render(<Error retryAction={mockRetryAction} />);
    expect(container).toMatchSnapshot();
  });

  it("maintains consistent rendering when rerendered", () => {
    const { rerender } = render(<Error retryAction={mockRetryAction} />);
    const initialButton = screen.getByTestId("try-again-btn");

    rerender(<Error retryAction={mockRetryAction} />);
    const rerenderButton = screen.getByTestId("try-again-btn");

    expect(initialButton).toBe(rerenderButton);
  });
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeEnabled(): R;
    }
  }
}
