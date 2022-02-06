import { initialState as initialAuthState } from "z@Stores/slices/auths/slice-auth";
import { initialState as initialAccountState } from "z@Stores/slices/accounts/slice-account";

export const initialState = {
  authState: initialAuthState,
  accountState: initialAccountState,
};
