import { useQuery } from "@tanstack/react-query";

import { requestEvolutionChain } from "../evolution-chain";
import { AxiosResponse } from "axios";


interface UseRequestEvolutionChainQueryParams {
	id: Pokemon["id"];
}

interface EvolutionChainData {
	[x: string]: any;
	chain: {
		species: { name: string };
		evolves_to: EvolutionChainData["chain"][];
	};
}

export const useRequestEvolutionChainQuery = (
	params: RequestParams<UseRequestEvolutionChainQueryParams>,
	settings?: RequestQuerySettings<typeof requestEvolutionChain>,
) =>
	useQuery<EvolutionChainData>({
		queryKey: ["evolution-chain", params.id],
		queryFn: async () => {
			const response: AxiosResponse<EvolutionChainData> = await requestEvolutionChain({
				params,
				...(settings?.config && { config: settings.config }),
			});
			return response.data;
		},
	});
