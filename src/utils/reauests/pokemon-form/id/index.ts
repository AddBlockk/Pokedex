import { AxiosRequestConfig } from "axios";
import { api } from "../../../api/instance";

interface RequestPokemonFormParams {
	params: { id: number };
	config?: AxiosRequestConfig;
}

export const requestPokemonForm = ({ params, config }: RequestPokemonFormParams) => {
	return api.get(`evolution-chain/${params.id}`, { ...config, params });
};
