import { useMutation } from '@tanstack/react-query';
import { Collection } from '../instance';
import { updateDocument } from '../requests/updateDocument';
import { PokemonDocument, UserDocument } from '../../../../@types/data';

interface UseUpdateDocumentPokemonMutationParams {
  collection: Extract<Collection, 'pokemons'>;
  data: Partial<PokemonDocument>;
  id: string;
}

interface UseUpdateDocumentUserMutationParams {
  collection: Extract<Collection, 'users'>;
  data: Partial<UserDocument>;
  id: string;
}

type UseUpdateDocumentMutationParams =
  | UseUpdateDocumentPokemonMutationParams
  | UseUpdateDocumentUserMutationParams;

export const useUpdateDocumentMutation = (
  settings?: RequestMutationSettings<typeof updateDocument>
) =>
  useMutation({
    mutationKey: ['updateDocumentMutation'],
    mutationFn: async (params: RequestParams<UseUpdateDocumentMutationParams>) => {
      return updateDocument(params.collection, params.data, params.id);
    },
    ...settings?.options,
  });