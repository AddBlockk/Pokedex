// import { useQuery } from "@tanstack/react-query";
// import { requestPokemonForm } from "../../../reauests";

// interface UseRequestPokemonEncointersQuery {
// 	id: number;
// }

// export const useRequestPokemonEncountersQuery = (
// 	params: <UseRequestPokemonEncountersQuery>,
// 	settings: RequestQuerySettings,
// ) =>
// 	useQuery({
// 		queryKey: ["evolution-chain", params.id],
// 		queryFn: () =>
// 			requestEvolutionChain(params, ...(settings?.config ? [{ config: settings.config }] : [])),
// 		...settings?.options,
// 	});
