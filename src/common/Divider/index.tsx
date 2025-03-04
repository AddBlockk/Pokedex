import React from "react";

import styles from "./Divider.module.css";

interface DividerProps {
	title: string;
}

export const Divider: React.FC<DividerProps> = ({ title }) => (
	<div className="flex items-center">
		<div className="flex-grow border-t border-gray-400" />
		<span className="mx-4 flex-shrink text-gray-400">{title}</span>
		<div className="flex-grow border-t border-gray-400" />
	</div>
);
