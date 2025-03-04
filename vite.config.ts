import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

export default defineConfig({
	plugins: [svgr(), tailwindcss(), react()],
	resolve: {},
});
