import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useAppSelector } from "appHooks";
import Header from ".";
import useAppBarScrollColor from "hooks/useAppBarScrollColor";
import theme from "utils/theme";

jest.mock("../../../store/hooks", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("../../../hooks/useAppBarScrollColor", () => jest.fn());

jest.mock(
  "next/link",
  () =>
    ({ children, href }: { children: React.ReactNode; href: string }) =>
      <a href={href}>{children}</a>
);

jest.mock("@mui/material/Badge", () => ({ children, badgeContent }: any) => (
  <div data-testid="badge">
    <span>{badgeContent}</span>
    {children}
  </div>
));

describe("Header Component", () => {
  const mockStore = configureStore([]);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});

    (useAppBarScrollColor as jest.Mock).mockReturnValue("blue");
    (useAppSelector as jest.Mock).mockReturnValue(3);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logo image with the correct size based on screen width", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/breadfast-brand.svg");
  });

  it("renders the shopping cart icon with the correct item count", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const cartIconBadge = screen.getByTestId("badge");
    expect(cartIconBadge).toBeInTheDocument();
    expect(cartIconBadge).toHaveTextContent("3");
  });

  it("applies the correct background color to the app bar", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const appBar = screen.getByRole("banner");
    expect(appBar).toHaveStyle(`background: blue`);
  });
});
