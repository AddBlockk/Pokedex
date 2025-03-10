import React from "react";

interface DividerProps {
	title: string;
}

export const Divider: React.FC<DividerProps> = ({ title }) => (
	<div className="flex items-center">
		<div className="flex-grow border-t border-gray-300" />
		<span className="mx-4 flex-shrink text-gray-300">{title}</span>
		<div className="flex-grow border-t border-gray-300" />
	</div>
);
