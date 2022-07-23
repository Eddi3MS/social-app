import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorHandling } from "../../../errors/errorHandling/ErrorHandling";
import { userService } from "../../../services/userService/userService";

interface IGetPhotos {
  page: number;
  total: number;
  user: number;
}

export const getPhotos = createAsyncThunk(
  "photo/session",
  async ({ page, total, user }: IGetPhotos, { rejectWithValue }) => {
    try {
      const response = await userService.getPhotos({ page, total, user });

      return response.data;
    } catch (error) {
      const errorHandling = new ErrorHandling(error);
      return rejectWithValue(errorHandling.error);
    }
  }
);
