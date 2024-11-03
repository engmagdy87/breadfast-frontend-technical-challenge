import { render, screen, fireEvent } from "@testing-library/react";
import { useMediaQuery } from "@mui/material";
import InformativeScreen from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("InformativeScreen", () => {
  const mockProps = {
    icon: "/test-icon.svg",
    iconAlt: "Test Icon",
    title: "Test Title",
    subtitle: "Test Subtitle",
    buttonText: "Test Button",
    buttonTestId: "test-button",
    buttonAction: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Desktop Layout", () => {
    beforeEach(() => {
      (useMediaQuery as jest.Mock).mockReturnValue(false);
    });

    it("renders all elements with desktop styling", () => {
      render(<InformativeScreen {...mockProps} />);

      const image = screen.getByAltText("Test Icon");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("width", "100");
      expect(image).toHaveAttribute("height", "100");

      const title = screen.getByText("Test Title");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H4");

      const subtitle = screen.getByText("Test Subtitle");
      expect(subtitle).toBeInTheDocument();
      expect(subtitle.tagName).toBe("H5");

      const button = screen.getByTestId("test-button");
      expect(button).toHaveTextContent("Test Button");
      expect(button).toHaveClass("MuiButton-sizeLarge");
    });
  });

  describe("Mobile/Tablet Layout", () => {
    beforeEach(() => {
      (useMediaQuery as jest.Mock).mockReturnValue(true);
    });

    it("renders all elements with mobile styling", () => {
      render(<InformativeScreen {...mockProps} />);

      const image = screen.getByAltText("Test Icon");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("width", "60");
      expect(image).toHaveAttribute("height", "60");

      const title = screen.getByText("Test Title");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H6");

      const subtitle = screen.getByText("Test Subtitle");
      expect(subtitle).toBeInTheDocument();
      expect(subtitle.tagName).toBe("H6");

      const button = screen.getByTestId("test-button");
      expect(button).toHaveTextContent("Test Button");
      expect(button).toHaveClass("MuiButton-sizeMedium");
    });
  });

  describe("Interaction Tests", () => {
    it("calls buttonAction when button is clicked", () => {
      render(<InformativeScreen {...mockProps} />);

      const button = screen.getByTestId("test-button");
      fireEvent.click(button);

      expect(mockProps.buttonAction).toHaveBeenCalledTimes(1);
    });
  });

  describe("Props Tests", () => {
    it("renders with default iconAlt when not provided", () => {
      const propsWithoutIconAlt = {
        ...mockProps,
        iconAlt: undefined,
      };

      render(<InformativeScreen {...propsWithoutIconAlt} />);

      const image = screen.getByAltText("");
      expect(image).toBeInTheDocument();
    });

    it("applies correct custom styles to Typography components", () => {
      render(<InformativeScreen {...mockProps} />);

      const title = screen.getByText("Test Title");
      expect(title).toHaveStyle({ fontWeight: 600 });
    });
  });

  describe("Accessibility Tests", () => {
    it("has accessible button with correct text", () => {
      render(<InformativeScreen {...mockProps} />);

      const button = screen.getByRole("button", { name: mockProps.buttonText });
      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();
    });

    it("has accessible image with alt text", () => {
      render(<InformativeScreen {...mockProps} />);

      const image = screen.getByAltText(mockProps.iconAlt);
      expect(image).toBeInTheDocument();
    });
  });
});
