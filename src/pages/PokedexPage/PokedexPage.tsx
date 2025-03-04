import React from "react";
import { useRequestPokemonsQueries } from "../../utils/api/hooks";
import { useRequestPokemonFormQuery } from "../../utils/api/hooks/pokemon-form/id";
import { typeColors } from "../../types/color";
import classNames from "classnames";

export const PokedexPage = () => {
	const [offset, _setOffset] = React.useState(6);
	const [selectedPokemonId, setSelectedPokemonId] = React.useState(1);
	const results = useRequestPokemonsQueries({ offset });

	const isLoading = results.some((result) => result.isLoading);
	if (isLoading) results.some((result) => result.isLoading);

	const { data } = useRequestPokemonFormQuery({
		id: selectedPokemonId,
		config: { enabled: !isLoading },
	});

	if (isLoading) return null;

	const pokemons = results.flatMap((result) => result.data?.data ?? []);
	const selectedPokemon = pokemons.find((pokemon) => selectedPokemonId === pokemon.id)!;

	return (
		<div className="container px-4 pb-4">
			<div className="flex min-h-screen items-center justify-center">
				<div className="flex gap-[10px]">
					<div className="min-w-[320px] p-[30px] text-black shadow-2xl">
						<div className="flex items-end justify-between font-bold">
							<div className="text-[20px] capitalize">{selectedPokemon.name}</div>
							<div>#00{selectedPokemon.id}</div>
						</div>
						<ul className="mt-[5px] flex gap-[5px]">
							{selectedPokemon.types.map((type: any) => {
								const bgColor = typeColors[type.type.name] || "bg-gray-400";
								return (
									<li
										key={type.type.name}
										className={`flex rounded-full border border-gray-300 px-3 py-1 text-[12px] text-white capitalize ${bgColor}`}
									>
										<div>{type.type.name}</div>
									</li>
								);
							})}
						</ul>
						<div className="w-full">
							<img
								src={selectedPokemon.sprites.front_default ?? ""}
								alt="pokemon"
								className="w-full"
							/>
						</div>
						<div className="flex justify-between">
							<div>
								<div className="text-[20px] font-bold">Статус</div>
								<ul className="mt-[10px] flex flex-col gap-[5px]">
									{selectedPokemon.stats.map((stat: any) => (
										<li
											key={stat.stat.name}
											className="flex border-b border-gray-300 pb-1 capitalize"
										>
											<div>{stat.stat.name}:&nbsp;</div>
											<div>{stat.base_stat}</div>
										</li>
									))}
								</ul>
							</div>
							<div>
								<div className="text-[20px] font-bold">Навыки</div>
								<ul className="mt-[10px] flex flex-col gap-[5px]">
									{selectedPokemon.abilities.map((ability: any) => (
										<li
											className="flex border-b border-gray-300 pb-1 capitalize"
											key={ability.ability.name}
										>
											{ability.ability.name}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
					<div className="flex min-w-[240px] cursor-pointer flex-col gap-[12px]">
						{pokemons.map((pokemon) => (
							<ul
								key={pokemon.id}
								className={classNames(
									"group flex justify-center rounded-l-full bg-gray-500 pr-[10px] text-white transition-all hover:scale-105 hover:bg-gray-700",
									{
										"bg-red-400 hover:bg-red-400": selectedPokemonId === pokemon.id,
									},
								)}
							>
								<li
									role="option"
									aria-selected={selectedPokemonId === pokemon.id}
									className="flex list-none items-center gap-[12px] text-[18px] font-semibold capitalize select-none group-hover:animate-pulse"
									onClick={() => setSelectedPokemonId(pokemon.id)}
									onKeyDown={(e) => {
										if (e.key === "Enter") setSelectedPokemonId(pokemon.id);
									}}
									tabIndex={0}
								>
									<img src={pokemon.sprites.front_default ?? ""} alt="pokemon" />
									<span>{pokemon.name}</span>
								</li>
							</ul>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
