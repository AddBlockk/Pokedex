import { useQuery } from "@tanstack/react-query";
import { requestStat } from "../../../../reauests";

interface UseRequestStatQueryParams {
	id: number;
}

export const useRequestStatQuery = ({ id }: UseRequestStatQueryParams) =>
	useQuery({
		queryKey: ["stat", id],
		queryFn: () => requestStat({ params: { id } }),
	});
