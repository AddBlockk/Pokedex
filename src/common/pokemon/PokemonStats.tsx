import React from "react";

interface PokemonStatsProps {
	title: string;
	stats: string[];
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ title, stats }) => (
	<div className="mt-[20px]">
		<div className="text-2xl font-bold">{title}</div>
		<ul>
			{stats.map((item) => (
				<li>{item}</li>
			))}
		</ul>
	</div>
);
