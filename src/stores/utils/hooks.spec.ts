import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import * as ReactRedux from "react-redux";
import * as UtilsHook from "./hooks";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("[Hooks]", () => {
  it("should be populated", () => {
    expect(UtilsHook).toBeDefined();
  });

  describe("[useAppDispatch]", () => {
    const mockUseDispatch: jest.SpyInstance = jest.fn();
    it("should trigger useDispatch", () => {
      jest
        .spyOn(ReactRedux, "useDispatch")
        .mockImplementationOnce(
          mockUseDispatch as unknown as () => Dispatch<AnyAction>
        );
      expect(mockUseDispatch).toHaveBeenCalledTimes(0);
      UtilsHook.useAppDispatch();
      expect(mockUseDispatch).toHaveBeenCalledTimes(1);
    });
  });
});
