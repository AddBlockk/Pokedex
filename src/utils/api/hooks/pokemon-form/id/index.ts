import { useQuery } from "@tanstack/react-query";
import { requestPokemonSpecies } from "../../../../reauests";

interface UseRequestPokemonFormQueryParams {
	id: number;
	config: any;
}

export const useRequestPokemonFormQuery = ({ id, config }: UseRequestPokemonFormQueryParams) =>
	useQuery({
		queryKey: ["pokemon-form", id],
		queryFn: () => requestPokemonSpecies({ params: { id } }),
		...config,
	});
