import { renderHook, act } from "@testing-library/react";
import useIntersectionObserver from ".";

describe("useIntersectionObserver", () => {
  let mockObserve: jest.Mock;
  let mockUnobserve: jest.Mock;
  let mockIntersectionObserver: jest.Mock;

  beforeAll(() => {
    mockObserve = jest.fn();
    mockUnobserve = jest.fn();

    mockIntersectionObserver = jest.fn(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: jest.fn(),
    }));

    global.IntersectionObserver = mockIntersectionObserver;
  });

  afterAll(() => {
    delete global.IntersectionObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a ref", () => {
    const { result } = renderHook(() =>
      useIntersectionObserver({ onIntersect: jest.fn() })
    );
    expect(result.current).toEqual({ current: null });
  });

  it("should call onIntersect when the element intersects", () => {
    const onIntersect = jest.fn();

    renderHook(() => useIntersectionObserver({ onIntersect }));

    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    const entries = [{ isIntersecting: true }];
    act(() => {
      observerCallback(entries);
    });

    expect(onIntersect).toHaveBeenCalledTimes(1);
  });

  it("should not call onIntersect when enabled is false", () => {
    const onIntersect = jest.fn();

    renderHook(() => useIntersectionObserver({ onIntersect, enabled: false }));

    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    const entries = [{ isIntersecting: true }];
    act(() => {
      observerCallback(entries);
    });

    expect(onIntersect).not.toHaveBeenCalled();
  });
});
