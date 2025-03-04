export const typeColors: Record<string, string> = {
	fire: "bg-red-500 dark:bg-red-700",
	water: "bg-blue-500 dark:bg-blue-700",
	grass: "bg-green-500 dark:bg-green-700",
	electric: "bg-yellow-500 dark:bg-yellow-600",
	ice: "bg-cyan-400 dark:bg-cyan-600",
	fighting: "bg-orange-700 dark:bg-orange-900",
	poison: "bg-purple-600 dark:bg-purple-800",
	ground: "bg-yellow-700 dark:bg-yellow-800",
	flying: "bg-indigo-400 dark:bg-indigo-600",
	psychic: "bg-pink-500 dark:bg-pink-700",
	bug: "bg-lime-600 dark:bg-lime-800",
	rock: "bg-gray-600 dark:bg-gray-700",
	ghost: "bg-indigo-800 dark:bg-indigo-900",
	dragon: "bg-purple-900 dark:bg-purple-950",
	dark: "bg-gray-900 dark:bg-black",
	steel: "bg-gray-400 dark:bg-gray-500",
	fairy: "bg-pink-300 dark:bg-pink-400",
	normal: "bg-gray-300 dark:bg-gray-400",
};

export const getTypeColor = (type: string): string => {
	return typeColors[type] || "bg-gray-500 dark:bg-gray-700";
};
