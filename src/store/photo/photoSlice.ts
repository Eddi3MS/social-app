import { createSlice } from "@reduxjs/toolkit";

import { IError } from "../../errors/IError";
import { IPhotoDTO } from "../../services/userService/dtos/userServiceDTO";
import { getPhotos } from "./thunks";

interface IPhotoState {
  loading: boolean;
  error: IError | null;
  data: IPhotoDTO[];
  id_modal_photo: number | null;
  current_page: number;
}

const initialState: IPhotoState = {
  loading: false,
  error: null,
  data: [],
  id_modal_photo: null,
  current_page: 1,
};

const photoSlice = createSlice({
  name: "photo",
  initialState: initialState,
  reducers: {
    selectPhoto(state, { payload }) {
      state.id_modal_photo = payload.id;
    },
    changePage(state, { payload }) {
      state.current_page = payload.page;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getPhotos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addCase(getPhotos.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.data = payload;
    });
    addCase(getPhotos.rejected, (state, { payload }) => {
      const error: IError = {
        message: (payload as IError).message,
        statusCode: (payload as IError).statusCode,
      };

      state.loading = false;
      state.error = error;
    });
  },
});

export const { selectPhoto, changePage, clearError } = photoSlice.actions;
export default photoSlice.reducer;
