import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorHandling } from "../../../errors/errorHandling/ErrorHandling";
import { userService } from "../../../services/userService/userService";

export const login = createAsyncThunk(
  "user/session",
  async (_, { rejectWithValue }) => {
    try {
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
