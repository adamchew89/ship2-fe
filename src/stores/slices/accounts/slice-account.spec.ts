import { AnyAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import * as FixtureAccounts from "z@Fixtures/accounts/fixture-account";
import * as AccountAPI from "z@Stores/apis/accounts/api-account";
import { store } from "z@Stores/store";
import { Account } from "z@Types/type-account";
import { StatusType } from "../slice";
import * as SliceAccount from "./slice-account";

jest.mock("z@Stores/apis/accounts/api-account");

describe("[SliceAccount]", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should be populated", () => {
    expect(SliceAccount).toBeDefined();
  });

  describe("[Reducers]", () => {
    it("should be populated", () => {
      expect(SliceAccount.reducer).toBeDefined();
    });

    it("should return initiateState", () => {
      expect(SliceAccount.reducer(undefined, {} as AnyAction)).toMatchObject(
        SliceAccount.initialState
      );
    });

    describe("[clearErrors]", () => {
      it("should return current state if error is undefined", () => {
        expect(
          SliceAccount.reducer(
            undefined,
            SliceAccount.action.clearErrors(undefined) as AnyAction
          )
        ).toEqual(SliceAccount.initialState);
      });

      it("should return remove error if error is defined", () => {
        expect(
          SliceAccount.reducer(
            { ...SliceAccount.initialState, error: "error" },
            SliceAccount.action.clearErrors(undefined) as AnyAction
          )
        ).toEqual(SliceAccount.initialState);
      });
    });

    describe("[asyncGetAccountThunk]", () => {
      describe("[asyncThunk]", () => {
        let mockGetAccountsAPI: jest.SpyInstance;

        beforeEach(() => {
          mockGetAccountsAPI = jest
            .spyOn(AccountAPI, "getAccountByIdAPI")
            .mockImplementation((token: string, id: number) =>
              Promise.resolve({
                data: {
                  data: FixtureAccounts.accounts[0],
                },
              } as AxiosResponse)
            );
        });

        it("should trigger API call and fulfilled", async () => {
          const meta = await store.dispatch(
            SliceAccount.asyncGetAccountThunk(FixtureAccounts.accounts[0]._id!)
          );
          expect(mockGetAccountsAPI).toHaveBeenCalledTimes(1);
          expect(meta.type).toEqual(expect.stringMatching(/\/fulfilled/));
        });

        it("should trigger API call and rejected", async () => {
          mockGetAccountsAPI.mockImplementationOnce(() =>
            Promise.reject(new Error())
          );
          const meta = await store.dispatch(
            SliceAccount.asyncGetAccountThunk(FixtureAccounts.accounts[0]._id!)
          );
          expect(mockGetAccountsAPI).toHaveBeenCalledTimes(1);
          expect(meta.type).toEqual(expect.stringMatching(/\/rejected/));
        });
      });

      describe("[extraReducers]", () => {
        describe("[fulfilled]", () => {
          it("should return current state if status is not LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.FAILED },
                SliceAccount.asyncGetAccountThunk.fulfilled
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.FAILED,
            });
          });

          it("should return IDLE status if status is LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.LOADING },
                SliceAccount.asyncGetAccountThunk.fulfilled
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.IDLE,
            });
          });
        });

        describe("[pending]", () => {
          it("should return current state if status is LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.LOADING },
                SliceAccount.asyncGetAccountThunk.pending
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.LOADING,
            });
          });

          it("should return LOADING status if status is not LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.FAILED },
                SliceAccount.asyncGetAccountThunk.pending
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.LOADING,
            });
          });
        });

        describe("[rejected]", () => {
          it("should return current state if status is not LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.IDLE },
                SliceAccount.asyncGetAccountThunk.rejected
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.IDLE,
            });
          });

          it("should return FAILED status if status is LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.LOADING },
                SliceAccount.asyncGetAccountThunk.rejected
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.FAILED,
            });
          });
        });
      });
    });
    describe("[asyncUpdateAccountThunk]", () => {
      describe("[asyncThunk]", () => {
        let mockGetAccountsAPI: jest.SpyInstance;

        beforeEach(() => {
          mockGetAccountsAPI = jest
            .spyOn(AccountAPI, "patchAccountByIdAPI")
            .mockImplementation((token: string, id: number, account: Account) =>
              Promise.resolve({
                data: {
                  data: FixtureAccounts.accounts[0],
                },
              } as AxiosResponse)
            );
        });

        it("should trigger API call and fulfilled", async () => {
          const meta = await store.dispatch(
            SliceAccount.asyncUpdateAccountThunk(FixtureAccounts.accounts[0])
          );
          expect(mockGetAccountsAPI).toHaveBeenCalledTimes(1);
          expect(meta.type).toEqual(expect.stringMatching(/\/fulfilled/));
        });

        it("should trigger API call and rejected", async () => {
          mockGetAccountsAPI.mockImplementationOnce(() =>
            Promise.reject(new Error())
          );
          const meta = await store.dispatch(
            SliceAccount.asyncUpdateAccountThunk(FixtureAccounts.accounts[0])
          );
          expect(mockGetAccountsAPI).toHaveBeenCalledTimes(1);
          expect(meta.type).toEqual(expect.stringMatching(/\/rejected/));
        });
      });

      describe("[extraReducers]", () => {
        describe("[fulfilled]", () => {
          it("should return current state if status is not LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.FAILED },
                SliceAccount.asyncUpdateAccountThunk.fulfilled
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.FAILED,
            });
          });

          it("should return IDLE status if status is LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.LOADING },
                SliceAccount.asyncUpdateAccountThunk.fulfilled
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.IDLE,
            });
          });
        });

        describe("[pending]", () => {
          it("should return current state if status is LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.LOADING },
                SliceAccount.asyncUpdateAccountThunk.pending
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.LOADING,
            });
          });

          it("should return LOADING status if status is not LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.FAILED },
                SliceAccount.asyncUpdateAccountThunk.pending
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.LOADING,
            });
          });
        });

        describe("[rejected]", () => {
          it("should return current state if status is not LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.IDLE },
                SliceAccount.asyncUpdateAccountThunk.rejected
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.IDLE,
            });
          });

          it("should return FAILED status if status is LOADING", () => {
            expect(
              SliceAccount.reducer(
                { ...SliceAccount.initialState, status: StatusType.LOADING },
                SliceAccount.asyncUpdateAccountThunk.rejected
              )
            ).toEqual({
              ...SliceAccount.initialState,
              status: StatusType.FAILED,
            });
          });
        });
      });
    });
  });
});
