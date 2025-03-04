import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button, Spinner, Typography } from "../../common/index";
import { useRequestPokemonByIdQuery, useRequestPokemonSpeciesQuery } from "../../utils/api/hooks";
import { getPokemonId } from "../../utils/helpers";
import { PokemonStats } from "../../common/pokemon/index";

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

	if (!isPokemonSpeciesData) {
		return <Spinner />;
	}

	return (
		<div className="page">
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

			<div className="name_container">
				<div className="number">{getPokemonId(id)}</div>
				<div>{pokemon.name}</div>
			</div>

			<div className="content">
				<div className="image_container">
					<img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />
				</div>
				<div>
					<PokemonStats
						title="Stats"
						stats={pokemon.stats.map((item: PokemonStat) => `${item.stat.name}: ${item.base_stat}`)}
					/>
					<PokemonStats
						title="Abilities"
						stats={pokemon.abilities.map(({ ability }: PokemonAbility) => ability.name)}
					/>
				</div>
			</div>

			<div className="button_container">
				{id > 1 && (
					<Button variant="outlined" onClick={() => navigate(`/pokemon/${id - 1}`)}>
						BACK
					</Button>
				)}
				<Button onClick={() => navigate(`/pokemon/${id + 1}`)}>NEXT</Button>
			</div>
		</div>
	);
};
