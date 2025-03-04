import { useQuery } from "@tanstack/react-query";

import { requestPokemonById } from "../../../reauests";

interface UseRequestPokemonQueryByIdParams {
	id: number;
}

export const useRequestPokemonByIdQuery = (
	params: UseRequestPokemonQueryByIdParams,
	settings?: RequestQuerySettings<typeof requestPokemonById>,
) =>
	useQuery({
		queryKey: ["pokemon", params.id],
		queryFn: () =>
			requestPokemonById({
				params,
				...(settings?.config ? { config: settings.config } : {}),
			}),
		...settings?.options,
	});
