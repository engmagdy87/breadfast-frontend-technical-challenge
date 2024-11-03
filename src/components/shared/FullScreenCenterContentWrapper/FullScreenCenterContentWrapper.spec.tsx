import { render } from "@testing-library/react";
import FullScreenCenterContentWrapper from ".";

describe("FullScreenCenterContentWrapper", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <FullScreenCenterContentWrapper>
        <div>Test Content</div>
      </FullScreenCenterContentWrapper>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("applies correct styles to wrapper Box", () => {
    const { container } = render(
      <FullScreenCenterContentWrapper>
        <div>Test Content</div>
      </FullScreenCenterContentWrapper>
    );

    const boxElement = container.firstChild as HTMLElement;

    expect(boxElement).toHaveStyle({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
    });
  });

  it("renders multiple children", () => {
    const { getByText } = render(
      <FullScreenCenterContentWrapper>
        <div>First Child</div>
        <div>Second Child</div>
      </FullScreenCenterContentWrapper>
    );

    expect(getByText("First Child")).toBeInTheDocument();
    expect(getByText("Second Child")).toBeInTheDocument();
  });

  it("maintains proper flex direction and alignment", () => {
    const { container } = render(
      <FullScreenCenterContentWrapper>
        <div>Test Content</div>
      </FullScreenCenterContentWrapper>
    );

    const boxElement = container.firstChild as HTMLElement;

    expect(boxElement).toHaveStyle({
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    });
  });
});
