import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import ReactRouterDom, { NavigateFunction } from "react-router-dom";
import { menuItems } from "z@Components/navigations/SideNavDrawer";
import * as FixtureAccounts from "z@Fixtures/accounts/fixture-account";
import * as FixtureStores from "z@Fixtures/stores/fixture-store";
import { initialState as initialAuthState } from "z@Stores/slices/auths/slice-auth";
import * as UtilsHook from "z@Stores/utils/hooks";
import App from "./App";

jest.mock("z@Stores/utils/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn,
  useLocation: jest.fn(),
}));

describe("[App]", () => {
  const mockDispatch: jest.SpyInstance = jest.fn();
  const mockNavigate: jest.SpyInstance = jest.fn();

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
    render(
      <ReactRouterDom.BrowserRouter>
        <App />
      </ReactRouterDom.BrowserRouter>
    );
    expect(screen.getByTestId("App")).toBeInTheDocument();
  });

  it("should render LandingPage and ShowSideNavDrawerBtn", () => {
    render(
      <ReactRouterDom.BrowserRouter>
        <App />
      </ReactRouterDom.BrowserRouter>
    );
    expect(screen.queryByTestId("LandingPage")).toBeInTheDocument();
    expect(screen.queryByTestId("ShowSideNavDrawerBtn")).toBeInTheDocument();
  });

  describe("[Drawer Events]", () => {
    it("should hidden by default", () => {
      render(
        <ReactRouterDom.BrowserRouter>
          <App />
        </ReactRouterDom.BrowserRouter>
      );
      expect(screen.queryByTestId("SideNavDrawer")).not.toBeInTheDocument();
    });

    it("should appear when ShowSideNavDrawerBtn is clicked", () => {
      render(
        <ReactRouterDom.BrowserRouter>
          <App />
        </ReactRouterDom.BrowserRouter>
      );
      const showSideNavDrawerBtn = screen.getByTestId("ShowSideNavDrawerBtn");
      UserEvent.click(showSideNavDrawerBtn);
      expect(screen.queryByTestId("SideNavDrawer")).toBeInTheDocument();
    });

    it("should hide when clicked away", () => {
      render(
        <ReactRouterDom.BrowserRouter>
          <App />
        </ReactRouterDom.BrowserRouter>
      );
      const showSideNavDrawerBtn = screen.getByTestId("ShowSideNavDrawerBtn");
      UserEvent.click(showSideNavDrawerBtn);
      const sideNavDrawer = screen.getByTestId("SideNavDrawer");
      expect(sideNavDrawer).toBeInTheDocument();
      const backdrop = screen.getByRole("presentation").firstElementChild;
      UserEvent.click(backdrop!);
      expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
    });

    describe("[Pre Login]", () => {
      describe("[Side Navigation Events]", () => {
        it("should show all side navigation buttons", () => {
          render(
            <ReactRouterDom.BrowserRouter>
              <App />
            </ReactRouterDom.BrowserRouter>
          );
          const showSideNavDrawerBtn = screen.getByTestId(
            "ShowSideNavDrawerBtn"
          );
          UserEvent.click(showSideNavDrawerBtn);
          expect(screen.queryByTestId("LoginPageBtn")).toBeInTheDocument();
          expect(screen.queryByTestId("LandingPageBtn")).toBeInTheDocument();
        });

        [
          { id: "LandingPageBtn", url: "/" },
          { id: "LoginPageBtn", url: "/login" },
        ].forEach((menuItem) => {
          it(`should trigger corresponding navigation to ${menuItem.url} when ${menuItem.id} is clicked`, () => {
            render(
              <ReactRouterDom.BrowserRouter>
                <App />
              </ReactRouterDom.BrowserRouter>
            );
            const showSideNavDrawerBtn = screen.getByTestId(
              "ShowSideNavDrawerBtn"
            );
            UserEvent.click(showSideNavDrawerBtn);
            const navBtn = screen.getByTestId(menuItem.id);
            UserEvent.click(navBtn);
            expect(mockNavigate).toBeCalledWith(menuItem.url);
          });
        });
      });
    });

    describe("[Post Login]", () => {
      beforeEach(() => {
        jest.spyOn(UtilsHook, "useAppSelector").mockImplementation((cb) => {
          return cb({
            ...FixtureStores.initialState,
            authState: {
              ...initialAuthState,
              user: FixtureAccounts.accounts[0],
            },
          });
        });
      });

      describe("[Side Navigation Events]", () => {
        it("should show all side navigation buttons", () => {
          render(
            <ReactRouterDom.BrowserRouter>
              <App />
            </ReactRouterDom.BrowserRouter>
          );
          const showSideNavDrawerBtn = screen.getByTestId(
            "ShowSideNavDrawerBtn"
          );
          UserEvent.click(showSideNavDrawerBtn);
          expect(screen.queryByTestId("LogoutBtn")).toBeInTheDocument();
          expect(
            screen.queryByTestId("CreateAccountPageBtn")
          ).toBeInTheDocument();
        });

        menuItems.forEach((menuItem) => {
          it(`should trigger corresponding navigation to ${menuItem.url} when ${menuItem.id} is clicked`, () => {
            render(
              <ReactRouterDom.BrowserRouter>
                <App />
              </ReactRouterDom.BrowserRouter>
            );
            const showSideNavDrawerBtn = screen.getByTestId(
              "ShowSideNavDrawerBtn"
            );
            UserEvent.click(showSideNavDrawerBtn);
            const navBtn = screen.getByTestId(menuItem.id);
            UserEvent.click(navBtn);
            expect(mockNavigate).toBeCalledWith(menuItem.url);
          });
        });
      });

      describe("[Logout Events]", () => {
        it("should show LogoutBtn", () => {
          render(
            <ReactRouterDom.BrowserRouter>
              <App />
            </ReactRouterDom.BrowserRouter>
          );
          const showSideNavDrawerBtn = screen.getByTestId(
            "ShowSideNavDrawerBtn"
          );
          UserEvent.click(showSideNavDrawerBtn);
          expect(screen.queryByTestId("LogoutBtn")).toBeInTheDocument();
        });

        it("should show trigger log out when LogoutBtn is pressed", () => {
          render(
            <ReactRouterDom.BrowserRouter>
              <App />
            </ReactRouterDom.BrowserRouter>
          );
          const showSideNavDrawerBtn = screen.getByTestId(
            "ShowSideNavDrawerBtn"
          );
          UserEvent.click(showSideNavDrawerBtn);
          const logoutBtn = screen.getByTestId("LogoutBtn");
          UserEvent.click(logoutBtn);
          expect(mockNavigate).toHaveBeenCalledWith("/");
        });
      });
    });
  });
});
