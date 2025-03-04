import { useQuery } from "@tanstack/react-query";
import { requestPokemonForm } from "../../../reauests";

interface UseRequestPokemonFormQueryParams {
	id: Pokemon["id"];
}

export const useRequestPokemonFormQuery = (
	params: RequestParams<UseRequestPokemonFormQueryParams>,
	settings?: RequestQuerySettings<typeof requestPokemonForm>,
) =>
	useQuery({
		queryKey: ["pokemon-form", params.id],
		queryFn: () =>
			requestPokemonForm({ params, ...(settings?.config && { config: settings.config }) }),
		...settings?.options,
	});
