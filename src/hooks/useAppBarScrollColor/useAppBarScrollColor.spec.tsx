import { renderHook, act } from "@testing-library/react";
import useAppBarScrollColor from ".";

describe("useAppBarScrollColor", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });

    jest.spyOn(window, "addEventListener");
    jest.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 'transparent' as the initial color", () => {
    const { result } = renderHook(() => useAppBarScrollColor());

    expect(result.current).toBe("transparent");
  });

  it("sets appBarColor to 'white' when scrollY exceeds the default threshold of 50", async () => {
    const { result } = renderHook(() => useAppBarScrollColor());

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe("white");
  });

  it("sets appBarColor to 'transparent' when scrollY is below the default threshold", () => {
    const { result } = renderHook(() => useAppBarScrollColor());

    act(() => {
      window.scrollY = 25;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe("transparent");
  });

  it("updates color based on custom scroll threshold", () => {
    const customThreshold = 200;
    const { result } = renderHook(() => useAppBarScrollColor(customThreshold));

    act(() => {
      window.scrollY = 150;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe("transparent");

    act(() => {
      window.scrollY = 250;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe("white");
  });

  it("cleans up event listener on unmount", () => {
    const { unmount } = renderHook(() => useAppBarScrollColor());

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});
