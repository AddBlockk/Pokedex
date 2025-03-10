import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadPhoto } from "../../common/modals/UploadPhotoModal/uploadPhoto"; // Импортируем функцию загрузки фото

// Типы для состояния
interface PhotoState {
  url: string | null;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: PhotoState = {
  url: null,
  loading: false,
  error: null,
};

// Асинхронный экшен для загрузки фотографии
export const uploadUserPhoto = createAsyncThunk(
    "photo/uploadUserPhoto",
    async ({ file, userId }: { file: File; userId: string }, { rejectWithValue }) => {
        try {
            const url = await uploadPhoto(file, userId); 
            return url;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Создание слайса
const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadUserPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.url = action.payload; // Сохраняем URL
      })
      .addCase(uploadUserPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default photoSlice.reducer;
