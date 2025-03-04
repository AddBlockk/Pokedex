import { useQuery } from "@tanstack/react-query";
import { requestPokemonByName } from "../../../reauests/pokemon/name/index";

interface UseRequestPokemonQueryByNameParams {
	name: string;
}

export const useRequestPokemonByNameQuery = (
	params: RequestParams<UseRequestPokemonQueryByNameParams>,
	settings?: RequestQuerySettings<typeof requestPokemonByName>,
) =>
	useQuery<Pokemon>({
		queryKey: ["pokemon", params.name],
		queryFn: () =>
			requestPokemonByName({
				params,
				...(settings?.config ? { config: settings.config } : {}),
			}),

		...settings?.options,
	});
