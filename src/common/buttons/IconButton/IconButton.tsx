import React from "react";

type IconButtonVariant = "contained" | "outlined" | "icon";
export interface IconButtonProps extends React.ComponentPropsWithRef<"button"> {
	variant?: IconButtonVariant;
	icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
	variant = "contained",
	disabled,
	icon,
	...props
}) => {
	const baseClasses =
		"flex items-center justify-center rounded-2xl p-1 shadow-md shadow-sm disabled:pointer-events-none disabled:opacity-60 dark:border transition-all duration-300 ease-in-out transform";

	const variantClasses = {
		contained:
			"bg-blue-500 text-white hover:bg-blue-400 hover:scale-105 active:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none",
		outlined:
			"border border-blue-500 text-blue-500 bg-inherit hover:border-blue-400 hover:text-blue-400 hover:scale-105 active:border-blue-500 active:text-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none",
		icon: "bg-inherit fill-neutral-500 stroke-neutral-500 shadow-none hover:fill-neutral-400 hover:stroke-neutral-400 hover:scale-105 active:fill-neutral-500 active:stroke-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:outline-none dark:fill-slate-300 dark:stroke-slate-300 dark:hover:fill-slate-200 dark:hover:stroke-slate-200 dark:active:fill-slate-200 dark:active:stroke-slate-200",
	};

	return (
		<button
			className={`${baseClasses} ${variantClasses[variant]}`}
			disabled={disabled}
			aria-disabled={disabled}
			{...props}
		>
			<span className="h-11 w-11">{icon}</span>
		</button>
	);
};
