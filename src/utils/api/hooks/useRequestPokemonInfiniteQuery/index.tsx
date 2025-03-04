import { useInfiniteQuery, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { requestPokemons } from "../../../reauests/index";
import { AxiosResponse } from "axios";

const REQUEST_POKEMONS_LIMIT = 50;

interface NamedAPIResourceList {
	count: number;
	next: string | null;
	previous: string | null;
	results: NamedAPIResource[];
}

interface NamedAPIResource {
	name: string;
	url: string;
}

interface RequestInfinityQuerySettings<Func = () => any> {
	config?: import("axios").AxiosRequestConfig;
	options?: import("@tanstack/react-query").UseInfiniteQueryOptions<
		Awaited<ReturnType<Func>>,
		unknown,
		InfiniteData<Awaited<ReturnType<Func>>>,
		Awaited<ReturnType<Func>>,
		any
	>;
}

export const useRequestPokemonInfiniteQuery = (
	settings?: RequestInfinityQuerySettings<typeof requestPokemons>,
): UseInfiniteQueryResult<InfiniteData<AxiosResponse<NamedAPIResourceList>>, unknown> => {
	const queryInfo = useInfiniteQuery({
		queryKey: ["pokemon"],
		queryFn: ({ pageParam = 0 }) =>
			requestPokemons({
				params: { limit: REQUEST_POKEMONS_LIMIT, offset: pageParam as number },
				...(settings?.config && { config: settings.config }),
			}),
		initialPageParam: 0,
		getNextPageParam: (lastPokemonsData, allPages) => {
			const pokemonsCount = allPages.length * REQUEST_POKEMONS_LIMIT;
			return pokemonsCount < lastPokemonsData.data.count ? pokemonsCount : undefined;
		},
		...settings?.options,
	});

	return queryInfo;
};
