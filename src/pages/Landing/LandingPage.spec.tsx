import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import ReactRouterDom, { NavigateFunction } from "react-router-dom";
import * as FixtureStores from "z@Fixtures/stores/fixture-store";
import * as UtilsHook from "z@Stores/utils/hooks";
import LandingPage from "./LandingPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("z@Stores/utils/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe("[LandingPage]", () => {
  const mockNavigate: jest.SpyInstance = jest.fn();
  const mockDispatch: jest.SpyInstance = jest.fn();

  beforeEach(() => {
    jest.spyOn(UtilsHook, "useAppSelector").mockImplementation((cb) => {
      return cb({
        ...FixtureStores.initialState,
      });
    });
    jest
      .spyOn(UtilsHook, "useAppDispatch")
      .mockImplementation(() => mockDispatch as unknown as Dispatch<AnyAction>);
    jest
      .spyOn(ReactRouterDom, "useNavigate")
      .mockImplementation(() => mockNavigate as unknown as NavigateFunction);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<LandingPage />);
    expect(screen.getByTestId("LandingPage")).toBeInTheDocument();
  });

  describe("[Link Events]", () => {
    it("should contain all page links", () => {
      render(<LandingPage />);
      expect(screen.queryByTestId("CreateAccountPageLink")).toBeInTheDocument();
    });

    [{ id: "CreateAccountPageLink", url: "/accounts/new" }].forEach((link) => {
      it(`should navigate to ${link.id} when ${link.url} is clicked`, () => {
        render(<LandingPage />);
        const linkBtn = screen.getByTestId(link.id);
        UserEvent.click(linkBtn);
        expect(mockNavigate).toBeCalledWith(link.url);
      });
    });
  });
});
