/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	options: {
		safelist: [
			"bg-blue-500",
			"text-white",
			"hover:bg-blue-400",
			"border",
			"border-blue-500",
			"text-blue-500",
			"hover:border-blue-400",
			"hover:text-blue-400",
			"bg-inherit",
			"text-neutral-500",
			"hover:text-neutral-400",
			"dark:text-slate-300",
			"dark:hover:text-slate-200",
		],
	},
	theme: {
		container: {
			center: true,
		},
		extend: {
			backgroundImage: {
				cover: "var(--image-cover)",
				logo: "var(--image-logo)",
			},
		},
	},
	plugins: [],
};
