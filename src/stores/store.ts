import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { reducer as ReducerAuth } from "./slices/auths/slice-auth";
import { reducer as ReducerAccount } from "./slices/accounts/slice-account";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: {
    authState: ReducerAuth,
    accountState: ReducerAccount,
  },
  devTools: true,
});
