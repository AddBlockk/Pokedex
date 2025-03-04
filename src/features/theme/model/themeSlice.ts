import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	theme: (localStorage.getItem("pokedex-theme") as "dark" | "light") || "dark",
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
			localStorage.setItem("pokedex-theme", action.payload);
		},
	},
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
