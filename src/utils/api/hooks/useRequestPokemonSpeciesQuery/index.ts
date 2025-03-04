import { useQuery } from "@tanstack/react-query";
import { requestPokemonForm } from "../../../reauests";
import { PokemonSpecies } from "../../../../../@types/PokemonSpecies";

interface UseRequestPokemonSpeciesQueryParams {
	id: number;
	config?: any;
}

export const useRequestPokemonSpeciesQuery = ({
	id,
	config,
}: UseRequestPokemonSpeciesQueryParams) =>
	useQuery<PokemonSpecies>({
		queryKey: ["pokemon-species", id],
		queryFn: () => requestPokemonForm({ params: { id } }),
		...config,
	});
