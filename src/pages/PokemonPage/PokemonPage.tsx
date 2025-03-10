import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button, Spinner, Typography } from "../../common/index";
import { useRequestPokemonByIdQuery, useRequestPokemonSpeciesQuery } from "../../utils/api/hooks";
import { getPokemonId } from "../../utils/helpers";
import { PokemonEvolutionChain, PokemonStats } from "../../common/pokemon/index";

interface PokemonStat {
	stat: {
		name: string;
	};
	base_stat: number;
}

interface PokemonAbility {
	ability: {
		name: string;
	};
}

export const PokemonPage: React.FC = () => {
	const navigate = useNavigate();
	const { pokemonId } = useParams();
	const id = +(pokemonId as string);

	const requestPokemonByIdQuery = useRequestPokemonByIdQuery({ id });
	const requestPokemonSpeciesQuery = useRequestPokemonSpeciesQuery({ id });

	const isPokemonData = !!requestPokemonByIdQuery.data && !requestPokemonByIdQuery.isLoading;
	const isPokemonSpeciesData =
		!!requestPokemonSpeciesQuery.data && !requestPokemonSpeciesQuery.isLoading;

	if (!isPokemonData) {
		return <Spinner />;
	}

	const pokemon = requestPokemonByIdQuery.data.data;

	return (
		<div className="page text-gray-800 dark:text-slate-300">
			<div
				tabIndex={0}
				role="button"
				onKeyPress={(event) => {
					if (event.key === "Enter") navigate(-1);
				}}
				onClick={() => navigate(-1)}
			>
				<Typography variant="title-body">back</Typography>
			</div>

			<div className="flex items-center gap-[10px]">
				<div className="number">{getPokemonId(id)}</div>
				<div className="text-2xl font-semibold capitalize">{pokemon.name}</div>
			</div>

			<div className="flex-3 justify-between md:flex md:gap-[50px]">
				<div className="flex flex-1 justify-center md:inline-flex">
					<img
						className="h-auto w-1/3 scale-[1.5] object-cover md:w-full md:scale-[1]"
						src={pokemon.sprites.front_default ?? ""}
						alt={pokemon.name}
						width="300"
						height="300"
					/>
				</div>
				<div className="flex-2">
					<div className="my-[55px] flex flex-col gap-[10px] md:w-[50%]">
						{id > 1 && (
							<Button variant="outlined" onClick={() => navigate(`/pokemon/${id - 1}`)}>
								BACK
							</Button>
						)}
						<Button onClick={() => navigate(`/pokemon/${id + 1}`)}>NEXT</Button>
					</div>
					<PokemonStats
						key={pokemon.id}
						title="Stats & Abilities"
						stats={[
							...pokemon.stats.map((item: PokemonStat) => `${item.stat.name}: ${item.base_stat}`),
							...pokemon.abilities.map(({ ability }: PokemonAbility) => ability.name),
						]}
					/>
				</div>
				{/* 
				{evolutionChainData?.url && (
					<PokemonEvolutionChain
						chainId={parseInt(evolutionChainData.url.split("/")[6], 10)}
						pokemonName={pokemon.name}
					/>
				)} */}
			</div>
		</div>
	);
};
