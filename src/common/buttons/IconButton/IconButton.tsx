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
		"flex items-center justify-center rounded-2xl bg-inherit p-1 shadow-md shadow-sm disabled:pointer-events-none disabled:opacity-60";
	const variantClasses = {
		contained: "bg-blue-500 fill-white hover:bg-blue-400",
		outlined:
			"border border-blue-500 bg-inherit fill-blue-500 hover:border-blue-400 hover:fill-blue-400 active:border-blue-500 active:fill-blue-500",
		icon: "bg-inherit fill-neutral-500 stroke-neutral-500 shadow-none hover:fill-neutral-400 active:fill-neutral-500 dark:fill-slate-300 dark:stroke-slate-300 dark:hover:fill-slate-200 dark:active:fill-slate-200",
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
