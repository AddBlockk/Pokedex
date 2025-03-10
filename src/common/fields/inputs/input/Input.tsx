import React from "react";
import classnames from "classnames";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
	isLoading?: boolean;
	error?: string;
}

export const Input: React.FC<InputProps> = React.forwardRef(
	({ id, placeholder, error, ...props }, inputRef) => (
		<label htmlFor={id} className="block w-full">
			<div className="mb-1 text-sm font-semibold">{placeholder}</div>
			<input
				className={classnames(
					"w-full rounded-md bg-neutral-100 p-3 shadow-sm focus:ring-2 focus:outline-none",
					"dark:bg-slate-500 dark:shadow-none",
					{ "bg-red-100 ring-1 ring-red-400": !!error },
				)}
				id={id}
				ref={inputRef}
				{...props}
			/>
			<span className="block min-h-[20px] text-sm text-red-400">{error}</span>{" "}
			{/* Зарезервированное место */}
		</label>
	),
);
