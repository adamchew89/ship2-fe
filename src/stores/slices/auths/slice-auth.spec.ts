import { AnyAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import * as FixtureAccount from "z@Fixtures/accounts/fixture-account";
import * as AuthAPI from "z@Stores/apis/auths/api-auth";
import { store } from "z@Stores/store";
import { Credential } from "z@Types/type-auth";
import { StatusType } from "../slice";
import * as SliceAuth from "./slice-auth";

jest.mock("z@Stores/apis/auths/api-auth");

describe("[SliceAuth]", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should be populated", () => {
    expect(SliceAuth).toBeDefined();
  });

  describe("[Reducers]", () => {
    it("should be populated", () => {
      expect(SliceAuth.reducer).toBeDefined();
    });

    it("should return initiateState", () => {
      expect(SliceAuth.reducer(undefined, {} as AnyAction)).toMatchObject(
        SliceAuth.initialState
      );
    });

    describe("[init]", () => {
      let mockLocalStorageGetItem: jest.SpyInstance;
      beforeEach(() => {
        mockLocalStorageGetItem = jest
          .spyOn(localStorage.__proto__, "getItem")
          .mockImplementation(() => JSON.stringify(FixtureAccount.accounts[0]));
      });

      it("should return updated user if undefined", () => {
        expect(
          SliceAuth.reducer(
            undefined,
            SliceAuth.action.init(undefined) as AnyAction
          )
        ).toEqual({
          ...SliceAuth.initialState,
          user: FixtureAccount.accounts[0],
        });
        expect(mockLocalStorageGetItem).toHaveBeenCalledTimes(1);
      });
      it("should return current state if user is defined", () => {
        expect(
          SliceAuth.reducer(
            { ...SliceAuth.initialState, user: FixtureAccount.accounts[0] },
            SliceAuth.action.init(undefined) as AnyAction
          )
        ).toEqual({
          ...SliceAuth.initialState,
          user: FixtureAccount.accounts[0],
        });
        expect(mockLocalStorageGetItem).toHaveBeenCalledTimes(0);
      });
    });

    describe("[logout]", () => {
      let mockLocalStorageRemoveItem: jest.SpyInstance;
      beforeEach(() => {
        mockLocalStorageRemoveItem = jest.spyOn(
          localStorage.__proto__,
          "removeItem"
        );
      });

      it("should return current state if user is undefined", () => {
        expect(
          SliceAuth.reducer(
            undefined,
            SliceAuth.action.logout(undefined) as AnyAction
          )
        ).toEqual(SliceAuth.initialState);
        expect(mockLocalStorageRemoveItem).toHaveBeenCalledTimes(0);
      });

      it("should return remove user if user is defined", () => {
        expect(
          SliceAuth.reducer(
            { ...SliceAuth.initialState, user: FixtureAccount.accounts[0] },
            SliceAuth.action.logout(undefined) as AnyAction
          )
        ).toEqual(SliceAuth.initialState);
        expect(mockLocalStorageRemoveItem).toHaveBeenCalledTimes(1);
      });
    });

    describe("[clearErrors]", () => {
      it("should return current state if error is undefined", () => {
        expect(
          SliceAuth.reducer(
            undefined,
            SliceAuth.action.clearErrors(undefined) as AnyAction
          )
        ).toEqual(SliceAuth.initialState);
      });

      it("should return remove error if error is defined", () => {
        expect(
          SliceAuth.reducer(
            { ...SliceAuth.initialState, error: "error" },
            SliceAuth.action.clearErrors(undefined) as AnyAction
          )
        ).toEqual(SliceAuth.initialState);
      });
    });

    describe("[asyncLoginThunk]", () => {
      describe("[asyncThunk]", () => {
        let mockLoginAPI: jest.SpyInstance;

        beforeEach(() => {
          mockLoginAPI = jest
            .spyOn(AuthAPI, "loginAPI")
            .mockImplementation((credential: Credential) =>
              Promise.resolve({
                data: { data: FixtureAccount.accounts[0] },
              } as AxiosResponse)
            );
        });

        it("should trigger API call and fulfilled", async () => {
          const meta = await store.dispatch(
            SliceAuth.asyncLoginThunk(FixtureAccount.credentials[0])
          );
          expect(mockLoginAPI).toHaveBeenCalledTimes(1);
          expect(meta.type).toEqual(expect.stringMatching(/\/fulfilled/));
        });

        it("should trigger API call and rejected", async () => {
          mockLoginAPI.mockImplementationOnce(() =>
            Promise.reject(new Error())
          );
          const meta = await store.dispatch(
            SliceAuth.asyncLoginThunk(FixtureAccount.credentials[0])
          );
          expect(mockLoginAPI).toHaveBeenCalledTimes(1);
          expect(meta.type).toEqual(expect.stringMatching(/\/rejected/));
        });
      });

      describe("[extraReducers]", () => {
        describe("[fulfilled]", () => {
          let mockLocalStorageSetItem: jest.SpyInstance;
          beforeEach(() => {
            mockLocalStorageSetItem = jest.spyOn(
              localStorage.__proto__,
              "setItem"
            );
          });

          it("should return current state if status is not LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.FAILED },
                SliceAuth.asyncLoginThunk.fulfilled
              )
            ).toEqual({ ...SliceAuth.initialState, status: StatusType.FAILED });
            expect(mockLocalStorageSetItem).toHaveBeenCalledTimes(0);
          });

          it("should return IDLE status if status is LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.LOADING },
                SliceAuth.asyncLoginThunk.fulfilled
              )
            ).toEqual({
              ...SliceAuth.initialState,
              status: StatusType.IDLE,
            });
            expect(mockLocalStorageSetItem).toHaveBeenCalledTimes(1);
          });
        });

        describe("[pending]", () => {
          it("should return current state if status is LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.LOADING },
                SliceAuth.asyncLoginThunk.pending
              )
            ).toEqual({
              ...SliceAuth.initialState,
              status: StatusType.LOADING,
            });
          });

          it("should return LOADING status if status is not LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.FAILED },
                SliceAuth.asyncLoginThunk.pending
              )
            ).toEqual({
              ...SliceAuth.initialState,
              status: StatusType.LOADING,
            });
          });
        });

        describe("[rejected]", () => {
          it("should return current state if status is not LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.IDLE },
                SliceAuth.asyncLoginThunk.rejected
              )
            ).toEqual({ ...SliceAuth.initialState, status: StatusType.IDLE });
          });

          it("should return FAILED status if status is LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.LOADING },
                SliceAuth.asyncLoginThunk.rejected
              )
            ).toEqual({ ...SliceAuth.initialState, status: StatusType.FAILED });
          });
        });
      });
    });

    describe("[asyncVerifyTokenThunk]", () => {
      describe("[asyncThunk]", () => {
        let mockLoginAPI: jest.SpyInstance;

        beforeEach(() => {
          mockLoginAPI = jest
            .spyOn(AuthAPI, "verifyTokenAPI")
            .mockImplementation((id, token) =>
              Promise.resolve({
                data: { data: token },
              } as AxiosResponse)
            );
        });

        it("should trigger API call and fulfilled", async () => {
          const meta = await store.dispatch(SliceAuth.asyncVerifyTokenThunk());
          expect(mockLoginAPI).toHaveBeenCalledTimes(1);
          expect(meta.type).toEqual(expect.stringMatching(/\/fulfilled/));
        });

        it("should trigger API call and rejected", async () => {
          mockLoginAPI.mockImplementationOnce(() =>
            Promise.reject(new Error())
          );
          const meta = await store.dispatch(SliceAuth.asyncVerifyTokenThunk());
          expect(mockLoginAPI).toHaveBeenCalledTimes(1);
          expect(meta.type).toEqual(expect.stringMatching(/\/rejected/));
        });
      });

      describe("[extraReducers]", () => {
        let mockLocalStorageRemoveItem: jest.SpyInstance;
        beforeEach(() => {
          mockLocalStorageRemoveItem = jest.spyOn(
            localStorage.__proto__,
            "removeItem"
          );
        });

        describe("[fulfilled]", () => {
          it("should return current state if status is not LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.FAILED },
                SliceAuth.asyncVerifyTokenThunk.fulfilled
              )
            ).toEqual({ ...SliceAuth.initialState, status: StatusType.FAILED });
          });

          it("should return IDLE status if status is LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.LOADING },
                SliceAuth.asyncVerifyTokenThunk.fulfilled
              )
            ).toEqual({
              ...SliceAuth.initialState,
              status: StatusType.IDLE,
            });
          });
        });

        describe("[pending]", () => {
          it("should return current state if status is LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.LOADING },
                SliceAuth.asyncVerifyTokenThunk.pending
              )
            ).toEqual({
              ...SliceAuth.initialState,
              status: StatusType.LOADING,
            });
          });

          it("should return LOADING status if status is not LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.FAILED },
                SliceAuth.asyncVerifyTokenThunk.pending
              )
            ).toEqual({
              ...SliceAuth.initialState,
              status: StatusType.LOADING,
            });
          });
        });

        describe("[rejected]", () => {
          it("should return current state if status is not LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.IDLE },
                SliceAuth.asyncVerifyTokenThunk.rejected
              )
            ).toEqual({ ...SliceAuth.initialState, status: StatusType.IDLE });
          });

          it("should return FAILED status if status is LOADING", () => {
            expect(
              SliceAuth.reducer(
                { ...SliceAuth.initialState, status: StatusType.LOADING },
                SliceAuth.asyncVerifyTokenThunk.rejected
              )
            ).toEqual({
              ...SliceAuth.initialState,
              status: StatusType.FAILED,
              user: undefined,
            });
            expect(mockLocalStorageRemoveItem).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
});
