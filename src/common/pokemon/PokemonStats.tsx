import React from "react";

interface PokemonStatsProps {
	title: string;
	stats: string[];
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ title, stats }) => (
	<div className="card">
		<div className="text-2xl font-bold">{title}</div>
		<ul>
			{stats.map((item, index) => (
				<li key={index} className="mt-1 border-b-2 border-black pb-1 dark:border-slate-600">
					{item}
				</li>
			))}
		</ul>
	</div>
);
