import React from "react";
import { render } from "@testing-library/react";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import LoadMore from ".";

jest.mock("../../../hooks/useIntersectionObserver");

describe("LoadMore Component", () => {
  const mockOnLoadMore = jest.fn();

  beforeEach(() => {
    (useIntersectionObserver as jest.Mock).mockReturnValue({ current: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default height and margin", () => {
    const { container } = render(
      <LoadMore onLoadMore={mockOnLoadMore} loading={false} />
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle("height: 20px");
    expect(div).toHaveStyle("margin: 20px 0");
  });

  it("applies additional styles if provided", () => {
    const customStyle = { backgroundColor: "blue" };
    const { container } = render(
      <LoadMore
        onLoadMore={mockOnLoadMore}
        loading={false}
        style={customStyle}
      />
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle("background-color: blue");
  });

  it("calls onLoadMore when intersected and not loading", () => {
    (useIntersectionObserver as jest.Mock).mockImplementation(
      ({ onIntersect }) => {
        onIntersect();
        return { current: null };
      }
    );

    render(<LoadMore onLoadMore={mockOnLoadMore} loading={false} />);

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });

  it("does not call onLoadMore if loading is true", () => {
    render(<LoadMore onLoadMore={mockOnLoadMore} loading={true} />);

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it("applies the provided className", () => {
    const { container } = render(
      <LoadMore
        onLoadMore={mockOnLoadMore}
        loading={false}
        className="test-class"
      />
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass("test-class");
  });
});
