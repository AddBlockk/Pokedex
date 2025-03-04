import { AxiosRequestConfig } from "axios";
import { api } from "../../../api/instance";

interface RequestStatParams {
	params: { id: number };
	config?: AxiosRequestConfig;
}

export const requestStat = ({ params, config }: RequestStatParams) => {
	return api.get(`stat/${params.id}`, { ...config, params });
};
