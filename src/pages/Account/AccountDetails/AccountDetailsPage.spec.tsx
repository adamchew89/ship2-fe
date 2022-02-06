import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import ReactRouterDom, { NavigateFunction } from "react-router-dom";
import * as FixtureAccounts from "z@Fixtures/accounts/fixture-account";
import * as FixtureStores from "z@Fixtures/stores/fixture-store";
import { initialState as initialAccountState } from "z@Stores/slices/accounts/slice-account";
import { RequestStatusType } from "z@Stores/slices/slice";
import * as UtilsHook from "z@Stores/utils/hooks";
import { Account } from "z@Types/type-account";
import AccountDetailsPage from "./AccountDetailsPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("z@Stores/utils/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("z@Stores/slices/accounts/slice-account");

describe("[AccountDetailsPage]", () => {
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
    render(<AccountDetailsPage />);
    expect(screen.getByTestId("AccountDetailsPage")).toBeInTheDocument();
  });

  describe("[Text Field Events]", () => {
    beforeEach(() => {
      jest.spyOn(UtilsHook, "useAppSelector").mockImplementation((cb) => {
        return cb({
          ...FixtureStores.initialState,
          accountState: {
            ...initialAccountState,
            account: FixtureAccounts.accounts[0],
            error: "error",
          },
        });
      });
    });

    it("should render input", () => {
      render(<AccountDetailsPage />);
      expect(screen.queryAllByTestId("Field").length).toBeGreaterThan(0);
    });

    [
      { id: 0, label: "name" },
      { id: 1, label: "mobile" },
      { id: 2, label: "pin" },
    ].forEach((field) => {
      it(`should update ${field.label}`, () => {
        render(<AccountDetailsPage />);
        const textField = screen.getAllByRole("input")[field.id];
        UserEvent.click(textField);
        UserEvent.type(textField, "ABC");
      });
    });
  });

  describe("[Form Submit Events]", () => {
    beforeEach(() => {
      jest.spyOn(UtilsHook, "useAppSelector").mockImplementation((cb) => {
        return cb({
          ...FixtureStores.initialState,
          accountState: {
            ...initialAccountState,
            account: FixtureAccounts.accounts[0],
          },
        });
      });
    });

    it("should render SubmitBtn", () => {
      render(<AccountDetailsPage />);
      expect(screen.queryByTestId("SubmitBtn")).toBeInTheDocument();
    });

    it("should navigate to / if fulfilled", async () => {
      mockDispatch.mockImplementationOnce((formData: Account) =>
        Promise.resolve({
          meta: { requestStatus: RequestStatusType.FULFILLED },
        })
      );
      render(<AccountDetailsPage />);
      const submitBtn = screen.getByTestId("SubmitBtn");
      expect(submitBtn).toBeDisabled();
      const inputs = screen.getAllByRole("input");
      inputs.forEach((input) => {
        UserEvent.click(input);
        UserEvent.type(input, "ABC");
      });
      expect(submitBtn).toBeEnabled();
      expect(mockNavigate).toHaveBeenCalledTimes(0);
      await UserEvent.click(submitBtn);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
