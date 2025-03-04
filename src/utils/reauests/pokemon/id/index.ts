import { AxiosRequestConfig } from "axios";
import { api } from "../../../api/instance";

interface RequestDataParams {
	params: { id: number; limit?: number; offset?: number };
	config?: AxiosRequestConfig;
}

export const requestPokemonById = ({ params, config }: RequestDataParams) => {
	return api.get<Pokemon>(`pokemon/${params.id}`, { ...config });
};
