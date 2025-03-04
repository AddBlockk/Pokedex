import { useQuery } from "@tanstack/react-query";
import { requestPokemonById } from "../../../../reauests";

interface UseRequestPokemonQueryParams {
	params: { id: number };
}

export const useRequestPokemonQuery = ({ params: { id } }: UseRequestPokemonQueryParams) =>
	useQuery({
		queryKey: ["pokemon", id],
		queryFn: async () => {
			const response = await requestPokemonById({ params: { id } });
			return response;
		},
	});
