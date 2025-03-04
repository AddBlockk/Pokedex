import React from "react";
import { useInView } from "../../utils/hooks";
import { Spinner } from "../../common/index";
import { useRequestPokemonInfiniteQuery } from "../../utils/api/hooks/index";
import { KEYS } from "../../utils/constants";
import { PokemonModal } from "../../common/modals/PokemonModal";
import { AxiosResponse } from "axios";
import { NamedAPIResource, NamedAPIResourceList } from "../../../@types/data";

export const PokemonsPage: React.FC = () => {
	const { isInView, ref } = useInView();
	const [selectedPokemonId, setSelectedPokemonId] = React.useState<number | null>(null);
	const { data, fetchNextPage, isLoading, hasNextPage } = useRequestPokemonInfiniteQuery();

	React.useEffect(() => {
		if (isInView && hasNextPage) {
			fetchNextPage();
		}
	}, [isInView, data]);

	if (isLoading || !data) return <Spinner />;

	const pokemons = data.pages.reduce(
		(pokemons: NamedAPIResource[], page: AxiosResponse<NamedAPIResourceList>) => {
			return [...pokemons, ...page.data.results];
		},
		[] as NamedAPIResource[],
	);

	console.log(selectedPokemonId);

	return (
		<div>
			<div className="grid grid-cols-1 gap-5 text-gray-600 md:grid-cols-3 md:gap-10">
				{pokemons.map((pokemon: NamedAPIResource, index: number) => {
					const id = index + 1;
					return (
						<div
							key={id}
							className="card"
							role="button"
							tabIndex={0}
							onKeyDown={(event) => {
								if (event.key === KEYS.ENTER) {
									setSelectedPokemonId(id);
								}
							}}
							onClick={() => {
								setSelectedPokemonId(id);
							}}
						>
							<div className="flex items-center justify-between gap-1">
								<div className="text-2xl font-bold capitalize">{pokemon.name}</div>
								<div className="text-base font-light">{id}</div>
							</div>
						</div>
					);
				})}
				{/* Модальное окно */}
				<PokemonModal
					isShowing={!!selectedPokemonId}
					pokemonId={selectedPokemonId}
					onClose={() => setSelectedPokemonId(null)}
				/>
			</div>
			<div ref={ref} className="h-10"></div>
		</div>
	);
};
