import { useMutation } from "@tanstack/react-query";
import { Collection } from "../instance";
import { updateDocument } from "../requests/updateDocument";

interface UseUpdateDocumentPokemonMutationParams {
	collection: "pokemons";
	data: Partial<PokemonDocument>;
	id: string;
}

interface UseUpdateDocumentUserMutationParams {
	collection: "users";
	data: Partial<UserDocument>;
	id: string;
}
type UseUpdateDocumentMutationParams =
	| UseUpdateDocumentPokemonMutationParams
	| UseUpdateDocumentUserMutationParams;

export const useUpdateDocumentMutation = (
	settings?: RequestMutationSettings<typeof updateDocument>,
) =>
	useMutation<
		{ success: boolean; message?: string },
		Error,
		UseUpdateDocumentMutationParams
	>({
		mutationKey: ["updateDocumentMutation"],
		mutationFn: async (params: UseUpdateDocumentMutationParams) => {
			return updateDocument(params.collection, params.data, params.id);
		},
		...settings?.options,
	});
