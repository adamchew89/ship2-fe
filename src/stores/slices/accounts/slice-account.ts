import {
  createAsyncThunk,
  createSlice,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import * as AccountAPI from "z@Stores/apis/accounts/api-account";
import { RootState } from "z@Stores/store";
import { Account } from "z@Types/type-account";
import SliceRedux, { StatusType } from "../slice";

export interface AccountState {
  account?: Account;
  accounts?: Account[];
  status: StatusType;
  error?: any;
}

export const initialState: AccountState = {
  status: StatusType.IDLE,
};

class SliceAccount extends SliceRedux {
  constructor() {
    super("account");
  }

  initializeSlice(): Slice<any, SliceCaseReducers<any>, string> {
    return createSlice({
      name: this.name,
      initialState,
      reducers: {
        clearErrors(state) {
          if (state.error) {
            state.error = undefined;
          }
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(asyncGetAllAccountThunk.fulfilled, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.error = undefined;
              state.accounts = action.payload as Account[];
              state.status = StatusType.IDLE;
              console.timeEnd("slice - asyncGetAllAccountThunk");
            }
          })
          .addCase(asyncGetAllAccountThunk.pending, (state) => {
            if (state.status !== StatusType.LOADING) {
              state.error = undefined;
              state.status = StatusType.LOADING;
            }
          })
          .addCase(asyncGetAllAccountThunk.rejected, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.status = StatusType.FAILED;
              state.error = action.payload;
              console.timeEnd("slice - asyncGetAllAccountThunk");
            }
          })
          .addCase(asyncGetAccountThunk.fulfilled, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.error = undefined;
              state.account = action.payload as Account;
              state.status = StatusType.IDLE;
              console.timeEnd("slice - asyncGetAccountThunk");
            }
          })
          .addCase(asyncGetAccountThunk.pending, (state) => {
            if (state.status !== StatusType.LOADING) {
              state.error = undefined;
              state.status = StatusType.LOADING;
            }
          })
          .addCase(asyncGetAccountThunk.rejected, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.status = StatusType.FAILED;
              state.error = action.payload;
              console.timeEnd("slice - asyncGetAccountThunk");
            }
          })
          .addCase(asyncCreateAccountThunk.fulfilled, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.error = undefined;
              state.account = action.payload as Account;
              state.status = StatusType.IDLE;
            }
          })
          .addCase(asyncCreateAccountThunk.pending, (state) => {
            if (state.status !== StatusType.LOADING) {
              state.error = undefined;
              state.status = StatusType.LOADING;
            }
          })
          .addCase(asyncCreateAccountThunk.rejected, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.status = StatusType.FAILED;
              state.error = action.payload;
            }
          })
          .addCase(asyncUpdateAccountThunk.fulfilled, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.error = undefined;
              state.account = action.payload as Account;
              state.status = StatusType.IDLE;
            }
          })
          .addCase(asyncUpdateAccountThunk.pending, (state) => {
            if (state.status !== StatusType.LOADING) {
              state.error = undefined;
              state.status = StatusType.LOADING;
            }
          })
          .addCase(asyncUpdateAccountThunk.rejected, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.status = StatusType.FAILED;
              state.error = action.payload;
            }
          });
      },
    });
  }
}

export const asyncGetAccountThunk = createAsyncThunk(
  "account/asyncGetAccountThunkStatus",
  async (_id: number, thunkAPI): Promise<Account | unknown> => {
    console.time("slice - asyncGetAccountThunk");
    try {
      const response = await AccountAPI.getAccountByIdAPI(
        (thunkAPI.getState() as RootState).authState.user?.token,
        _id || (thunkAPI.getState() as RootState).authState.user?._id
      );
      return response.data.data as Account;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const asyncGetAllAccountThunk = createAsyncThunk(
  "account/asyncGetAllAccountThunkStatus",
  async (_, thunkAPI): Promise<Account[] | unknown> => {
    console.time("slice - asyncGetAllAccountThunk");
    try {
      const response = await AccountAPI.getAccountsAPI(
        (thunkAPI.getState() as RootState).authState.user?.token
      );
      return response.data.data as Account[];
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const asyncCreateAccountThunk = createAsyncThunk(
  "account/asyncCreateAccountThunk",
  async (account: Account, thunkAPI): Promise<Account | unknown> => {
    try {
      const response = await AccountAPI.createAccountAPI(
        (thunkAPI.getState() as RootState).authState.user?.token,
        (thunkAPI.getState() as RootState).authState.user?._id,
        account
      );
      return response.data.data as Account;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const asyncUpdateAccountThunk = createAsyncThunk(
  "account/asyncUpdateAccountThunk",
  async (account: Account, thunkAPI): Promise<Account | unknown> => {
    try {
      const response = await AccountAPI.putAccountByIdAPI(
        (thunkAPI.getState() as RootState).authState.user?.token,
        (thunkAPI.getState() as RootState).authState.user?._id,
        account
      );
      return response.data.data as Account;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const instance = new SliceAccount();

export const reducer = instance.slice.reducer;
export const action = instance.slice.actions;

export default instance;
