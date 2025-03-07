import React from "react";
import { useNavigate } from "react-router-dom";

import { PokemonTypes } from "../pokemon/index";
import { useRequestPokemonByNameQuery } from "../../utils/api/hooks";

interface PokemonShortCardProps {
	name: string;
	image?: string;
}

export const PokemonShortCard: React.FC<PokemonShortCardProps> = ({ name }) => {
	const navigate = useNavigate();
	const { data: pokemonByNameData, isLoading: pokemonByNameLoading } = useRequestPokemonByNameQuery(
		{
			name,
		},
	);

	const isPokemonByNameData = !!pokemonByNameData && !pokemonByNameLoading;
	if (!isPokemonByNameData) return null;

	const pokemon = pokemonByNameData;

	return (
		<div
			className="flex w-full overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-600"
			role="button"
			tabIndex={0}
			onKeyPress={(event) => {
				if (event.key === "Enter") return navigate(`/pokemon/${pokemon.id}`);
			}}
			onClick={() => navigate(`/pokemon/${pokemon.id}`)}
		>
			<div className="w-5/12">
				<img src={pokemon.sprites.front_default ?? ""} alt="" />
			</div>
			<div className="flex w-full flex-col gap-1 p-5">
				<div className="text-left text-lg font-semibold">{name}</div>
				<PokemonTypes types={pokemon?.types ?? []} />
			</div>
		</div>
	);
};
