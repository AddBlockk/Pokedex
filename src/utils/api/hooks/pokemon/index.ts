import { useQueries } from "@tanstack/react-query";
import { requestPokemonById } from "../../../reauests";

interface UseRequestPokemonQueriesParams {
	offset: number;
}

export const useRequestPokemonsQueries = ({ offset }: UseRequestPokemonQueriesParams) =>
	useQueries({
		queries: Array.from({ length: offset }, (_el, index) => ({
			queryKey: ["pokemon", index],
			queryFn: () => requestPokemonById({ params: { id: index + 1 } }),
		})),
	});
