import { render, screen } from "@testing-library/react";
import { useMediaQuery } from "@mui/material";
import Loader from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

jest.mock("../../../components/shared/FullScreenCenterContentWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="fullscreen-wrapper">{children}</div>
  ),
}));

describe("Loader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Desktop View", () => {
    beforeEach(() => {
      (useMediaQuery as jest.Mock).mockReturnValue(false);
    });

    it("renders with correct desktop dimensions", () => {
      render(<Loader />);

      const image = screen.getByAltText("Loading...");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("width", "70");
      expect(image).toHaveAttribute("height", "70");
    });

    it("uses correct image source", () => {
      render(<Loader />);

      const image = screen.getByAltText("Loading...");
      expect(image).toHaveAttribute("src", "/breadfast.png");
    });
  });

  describe("Mobile/Tablet View", () => {
    beforeEach(() => {
      (useMediaQuery as jest.Mock).mockReturnValue(true);
    });

    it("renders with correct mobile dimensions", () => {
      render(<Loader />);

      const image = screen.getByAltText("Loading...");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("width", "40");
      expect(image).toHaveAttribute("height", "40");
    });
  });

  describe("General Component Tests", () => {
    it("renders within FullScreenCenterContentWrapper", () => {
      render(<Loader />);

      const wrapper = screen.getByTestId("fullscreen-wrapper");
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toContainElement(screen.getByAltText("Loading..."));
    });

    it("applies auto height style to image", () => {
      render(<Loader />);

      const image = screen.getByAltText("Loading...");
      expect(image).toHaveStyle({ height: "auto" });
    });

    it("has correct accessibility attributes", () => {
      render(<Loader />);

      const image = screen.getByAltText("Loading...");
      expect(image).toHaveAttribute("alt", "Loading...");
    });
  });
});
