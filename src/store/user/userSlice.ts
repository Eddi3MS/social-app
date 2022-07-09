import { createSlice } from "@reduxjs/toolkit";

import { login } from "./thunks";
import { IError } from "../../errors/IError";
import { TokenService } from "../../services/tokenService/tokenService";

interface IUser {
  email: string;
  id: number;
  nome: string;
  username: string;
}

interface IUserState {
  loading: boolean;
  user: IUser | null;
  error: IError | null;
}

const initialState: IUserState = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      TokenService.logout();
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.user = payload;
    });
    addCase(login.rejected, (state, { payload }) => {
      const error: IError = {
        message: (payload as IError).message,
        statusCode: (payload as IError).statusCode,
      };

      state.loading = false;
      state.error = error;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
