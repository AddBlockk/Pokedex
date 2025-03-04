import { AxiosRequestConfig } from "axios";
import { api } from "../../api/instance";

interface RequestPokemonParams {
	params: { limit: number; offset: number };
	config?: AxiosRequestConfig;
}

export const requestPokemons = ({ params, config }: RequestPokemonParams) =>
	api.get<NamedAPIResourceList>(`pokemon`, { params, ...config });
