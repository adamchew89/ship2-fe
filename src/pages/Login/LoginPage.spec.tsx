import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { render, screen, within } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import ReactRouterDom, { NavigateFunction } from "react-router-dom";
import * as FixtureStores from "z@Fixtures/stores/fixture-store";
import { initialState as initialAuthState } from "z@Stores/slices/auths/slice-auth";
import { RequestStatusType } from "z@Stores/slices/slice";
import * as UtilsHook from "z@Stores/utils/hooks";
import LoginPage from "./LoginPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("z@Stores/utils/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("z@Stores/slices/auths/slice-auth");

describe("[LoginPage]", () => {
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
    render(<LoginPage />);
    expect(screen.getByTestId("LoginPage")).toBeInTheDocument();
  });

  it("[Form Navigation Events]", () => {
    render(<LoginPage />);
    const inputs = screen.getAllByRole("input");
    const submitBtn = screen.getByTestId("LoginFormSubmitBtn");
    inputs[0].focus();
    expect(inputs[0]).toHaveFocus();
    UserEvent.tab();
    expect(inputs[1]).toHaveFocus();
    UserEvent.type(inputs[1], "{enter}");
    expect(submitBtn).toHaveFocus();
  });

  describe("[Form Change Events]", () => {
    it("should render form with at least one field without crashing", () => {
      render(<LoginPage />);
      const fields = screen.getAllByTestId("Field");
      expect(fields).toBeTruthy();
      expect(fields.length).toBeGreaterThan(0);
    });

    it("should alter input fields according to user input", () => {
      const mockChangeValue = "A";
      render(<LoginPage />);
      const fields = screen.getAllByTestId("Field");
      const fieldInput = within(fields[0]).getByRole("input");
      UserEvent.click(fieldInput);
      UserEvent.keyboard(mockChangeValue);
      expect(screen.getByDisplayValue(mockChangeValue)).toBeInTheDocument();
    });

    it("should dispatch ActionAuth.clearErrors", () => {
      jest.spyOn(UtilsHook, "useAppSelector").mockImplementation((cb) => {
        return cb({
          ...FixtureStores.initialState,
          authState: { ...initialAuthState, error: true },
        });
      });
      const mockChangeValue = "A";
      render(<LoginPage />);
      const fields = screen.getAllByTestId("Field");
      const fieldInput = within(fields[0]).getByRole("input");
      UserEvent.click(fieldInput);
      expect(mockDispatch).toHaveBeenCalledTimes(0);
      UserEvent.keyboard(mockChangeValue);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe("[Form Validation Events]", () => {
    it("should be disabled by default", () => {
      render(<LoginPage />);
      const submitBtn = screen.getByTestId("LoginFormSubmitBtn");
      expect(submitBtn).toBeDisabled();
    });

    it("should be enabled when all required fields are populated", () => {
      const mockChangeValue = "A";
      render(<LoginPage />);
      const fields = screen.getAllByTestId("Field");
      fields.forEach((field) => {
        const fieldInput = within(field).getByRole("input");
        UserEvent.click(fieldInput);
        UserEvent.keyboard(mockChangeValue);
      });
      const submitBtn = screen.getByTestId("LoginFormSubmitBtn");
      expect(submitBtn).toBeEnabled();
    });
  });

  describe("[Form Submission Events]", () => {
    beforeEach(() => {
      mockDispatch.mockImplementation(() => ({
        meta: { requestStatus: RequestStatusType.FULFILLED },
      }));
    });

    it("should dispatch ActionAuth.asyncLoginThunk", () => {
      const mockChangeValue = "A";
      render(<LoginPage />);
      const fields = screen.getAllByTestId("Field");
      fields.forEach((field) => {
        const fieldInput = within(field).getByRole("input");
        UserEvent.click(fieldInput);
        UserEvent.keyboard(mockChangeValue);
      });
      const submitBtn = screen.getByTestId("LoginFormSubmitBtn");
      expect(mockDispatch).toHaveBeenCalledTimes(0);
      UserEvent.click(submitBtn);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
});
