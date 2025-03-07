import React from "react";
import { useRequestPokemonQuery } from "../../../utils/api/hooks";
import { PokemonTypes } from "../../../common/pokemon/PokemonTypes";
import { PokemonStats } from "../../../common/pokemon/PokemonStats";
import { PokemonAbilities } from "../../../common/pokemon/PokemonAbilities";

interface PokemonInfoProps {
	id: number;
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({ id }) => {
	const { data, isLoading } = useRequestPokemonQuery({ params: { id } });

	if (isLoading) return <div className="text-center text-xl font-semibold">Loading...</div>;

	const { types = [], stats = [], abilities = [] } = data?.data || {};

	return (
		<div className="min-w-[320px] rounded-lg bg-white p-[30px] text-black shadow-2xl">
			{/* <div className="flex items-end justify-between font-bold">
				<div className="text-[20px] capitalize">{data?.data.name}</div>
				<div>#00{data?.data.id}</div>
			</div>
			<PokemonTypes types={types} />
			<div className="flex w-full justify-center">
				<img src={data?.data.sprites.front_default ?? ""} alt="pokemon" className="w-[50%]" />
			</div>
			<div className="flex justify-between">
				<PokemonStats stats={stats} title={""} />
				<PokemonAbilities abilities={abilities} />
			</div>
			<button className="mt-[10px] w-full cursor-pointer rounded-lg bg-amber-800 py-2 text-white">
				Открыть
			</button>
			fdsfds */}
		</div>
	);
};
