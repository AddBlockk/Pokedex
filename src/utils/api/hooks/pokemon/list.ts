import { useQuery } from "@tanstack/react-query";
import { api } from "../../instance";

interface UsePokemonsListParams {
	page: number;
	limit?: number;
}

export const usePokemonsListQuery = ({ page, limit = 10 }: UsePokemonsListParams) => {
	return useQuery({
		queryKey: ["pokemonsList", page, limit],
		queryFn: async () => {
			const offset = (page - 1) * limit;
			const response = await api.get("pokemon", {
				params: { limit, offset },
			});
			return response.data;
		},
		placeholderData: (previousData) => previousData,
	});
};
