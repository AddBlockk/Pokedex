import { AxiosRequestConfig } from "axios";
import { api } from "../../../../utils/api/instance";

interface RequestPokemonParams {
	params: { name: string };
	config?: AxiosRequestConfig;
}

export const requestPokemonByName = ({ params, config }: RequestPokemonParams) =>
	api.get<Pokemon>(`pokemon/${params.name}`, config).then((response) => response.data);