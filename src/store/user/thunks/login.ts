import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorHandling } from "../../../errors/errorHandling/ErrorHandling";
import { userService } from "../../../services/userService/userService";

interface ILogin {
  params?: string;
  skipParams?: boolean;
  skipVal?: boolean;
}

export const login = createAsyncThunk(
  "user/session",
  async ({ params, skipParams, skipVal }: ILogin, { rejectWithValue }) => {
    try {
      if (!skipParams) {
        await userService.loginUser(params!);
      }
      if (!skipVal) {
        await userService.tokenValidate();
      }
      const response = await userService.getUser();

      return {
        ...response.data,
      };
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      return rejectWithValue(errorHandling.error);
    }
  }
);
