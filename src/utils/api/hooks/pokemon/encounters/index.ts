import { AxiosRequestConfig } from "axios";
import { api } from "../../../instance";

interface RequestPokemonParams {
	params: { id: number };
	config?: AxiosRequestConfig;
}

export const requestPokemonEncounters = ({ params, config }: RequestPokemonParams) =>
	api.get<any>(`pokemon/${params.id}/encounters`, { ...config });
