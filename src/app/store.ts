import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/model/themeSlice";
import { authApi } from "../entities/auth/api/authApi";
// import photoReducer from "../features/photo/photoSlice";

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		[authApi.reducerPath]: authApi.reducer,
		// photo: photoReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
