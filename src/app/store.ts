import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/model/themeSlice";
import { authApi } from "../entities/auth/api/authApi";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
