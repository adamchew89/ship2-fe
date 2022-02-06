import {
  createAsyncThunk,
  createSlice,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import * as AuthAPI from "z@Stores/apis/auths/api-auth";
import { RootState } from "z@Stores/store";
import { Account } from "z@Types/type-account";
import { Credential } from "z@Types/type-auth";
import SliceRedux, { StatusType } from "../slice";

export interface AuthState {
  user?: Account;
  status: StatusType;
  error?: any;
}

export const initialState: AuthState = {
  status: StatusType.IDLE,
};

class SliceAuth extends SliceRedux {
  constructor() {
    super("auth");
  }

  initializeSlice(): Slice<any, SliceCaseReducers<any>, string> {
    return createSlice({
      name: this.name,
      initialState,
      reducers: {
        init(state) {
          if (!state.user) {
            state.user = JSON.parse(
              localStorage.getItem("user") as string
            ) as Account;
          }
        },
        logout(state) {
          if (state.user) {
            localStorage.removeItem("user");
            state.user = undefined;
          }
        },
        clearAccounts(state) {
          if (state.accounts) {
            state.accounts = undefined;
          }
        },
        clearErrors(state) {
          if (state.error) {
            state.error = undefined;
          }
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(asyncLoginThunk.fulfilled, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.error = undefined;
              state.user = action.payload as Account;
              localStorage.setItem("user", JSON.stringify(action.payload));
              state.status = StatusType.IDLE;
              console.timeEnd("slice - asyncLoginThunk");
            }
          })
          .addCase(asyncLoginThunk.pending, (state) => {
            if (state.status !== StatusType.LOADING) {
              state.error = undefined;
              state.status = StatusType.LOADING;
            }
          })
          .addCase(asyncLoginThunk.rejected, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.status = StatusType.FAILED;
              state.error = action.payload;
              console.timeEnd("slice - asyncLoginThunk");
            }
          })
          .addCase(asyncVerifyTokenThunk.fulfilled, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.error = undefined;
              state.status = StatusType.IDLE;
              console.timeEnd("slice - asyncVerifyTokenThunk");
            }
          })
          .addCase(asyncVerifyTokenThunk.pending, (state) => {
            if (state.status !== StatusType.LOADING) {
              state.error = undefined;
              state.status = StatusType.LOADING;
            }
          })
          .addCase(asyncVerifyTokenThunk.rejected, (state, action) => {
            if (state.status === StatusType.LOADING) {
              state.user = undefined;
              localStorage.removeItem("user");
              state.error = action.payload;
              state.status = StatusType.FAILED;
              console.timeEnd("slice - asyncVerifyTokenThunk");
            }
          });
      },
    });
  }
}

export const asyncLoginThunk = createAsyncThunk(
  "auth/asyncLoginThunkStatus",
  async (credential: Credential, thunkAPI): Promise<Account | unknown> => {
    console.time("slice - asyncLoginThunk");
    try {
      const response = await AuthAPI.loginAPI(credential);
      return response.data.data as Account;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const asyncVerifyTokenThunk = createAsyncThunk(
  "auth/asyncVerifyTokenThunkStatus",
  async (_, thunkAPI): Promise<void | unknown> => {
    console.time("slice - asyncVerifyTokenThunk");
    try {
      const { _id, token } = (thunkAPI.getState() as RootState).authState.user;
      const response = await AuthAPI.verifyTokenAPI(_id, token);
      return response.data.data as string;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const instance = new SliceAuth();

export const reducer = instance.slice.reducer;
export const action = instance.slice.actions;

export default instance;
