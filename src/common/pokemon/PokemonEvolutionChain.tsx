import React from "react";
import { useRequestEvolutionChainQuery } from "../../utils/api/hooks/useRequestEvolutionChainQuery";
import { generatePokemonChain } from "../../utils/helpers";
import { Typography } from "../Typography";
import { PokemonShortCard } from "./PokemonShortCard";
import { Pokemon } from "../../../@types/data";

interface PokemonEvolutionChainProps {
	chainId: number;
	pokemonName: Pokemon["name"];
}

export const PokemonEvolutionChain: React.FC<PokemonEvolutionChainProps> = ({
	chainId,
	pokemonName,
}) => {
	console.log("Calling useRequestEvolutionChainQuery with chainId:", chainId);
	const { data: evolutionChainData, isLoading: evolutionChainLoading } =
		useRequestEvolutionChainQuery({ id: chainId });

	const isEvolutionChainData = !!evolutionChainData && !evolutionChainLoading;
	if (!isEvolutionChainData) return null;
	console.log("useRequestEvolutionChainQuery Data:", evolutionChainData);
	console.log("Loading State:", evolutionChainLoading);
	const evolutionChain = evolutionChainData?.data?.chain;
	if (!evolutionChain) return null;
	const pokemonChain = generatePokemonChain(pokemonName, evolutionChain);

	return (
		<div className="flex flex-col gap-3 py-5">
			{!!pokemonChain.prev && (
				<>
					<Typography variant="title">Previos evolution</Typography>
					<div className="mt-2 flex flex-col justify-between gap-4">
						<PokemonShortCard name={pokemonChain.prev.species.name} />{" "}
					</div>
				</>
			)}
			{!!pokemonChain.next.length && (
				<>
					<Typography variant="title">Next evolution(s)</Typography>
					<div className="mt-2 flex flex-col justify-between gap-4">
						{pokemonChain.next.map((evolution: any) => (
							<PokemonShortCard key={evolution.species.name} name={evolution.species.name} />
						))}
					</div>
				</>
			)}
		</div>
	);
};
