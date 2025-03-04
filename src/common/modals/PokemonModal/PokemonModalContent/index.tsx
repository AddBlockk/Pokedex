import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Typography } from "../../../../common/index";
import { PokemonTypes } from "../../../../common/pokemon/index";
// import { ModalProps, Pokemon } from "../../../../../@types/data";
import { useRequestPokemonByIdQuery } from "../../../../utils/api/hooks/index";
import { useGetAuthStateQuery } from "../../../../entities/auth/api/authApi";
import { useUpdateDocumentMutation } from "../../../../utils/firebase/hooks/useUpdateDocumentMutation";
interface PokemonModalContentProps extends Pick<ModalProps, "onClose"> {
	pokemonId: Pokemon["id"];
}

const MAX_USER_POKEMONS = 6;

export const PokemonModalContent: React.FC<PokemonModalContentProps> = ({ pokemonId, onClose }) => {
	const navigate = useNavigate();
	const { data: user, isLoading: isAuthLoading } = useGetAuthStateQuery();
	const { data: response, isLoading } = useRequestPokemonByIdQuery({ id: pokemonId });
	const { mutate: updateDocument, isLoading: isUpdating } = useUpdateDocumentMutation();

	if (isLoading || isAuthLoading || !response?.data) return <Spinner />;

	const pokemon = response.data;
	const isShowAddButton =
		user &&
		user.isLoginIn &&
		user.pokemons?.length < MAX_USER_POKEMONS &&
		!user.pokemons?.some((p: { id: number }) => p.id === pokemonId);

	return (
		<div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
			<Typography variant="title" className="text-xl font-bold">
				{pokemon.name}
			</Typography>

			<div className="flex h-32 w-32 items-center justify-center">
				<img
					src={pokemon.sprites.front_default ?? ""}
					alt={pokemon.name}
					className="h-full w-full object-contain"
				/>
			</div>

			<PokemonTypes types={pokemon.types} />

			{/* {isShowAddButton && (
				<Button
					loading={isUpdating}
					onClick={() =>
						updateDocument({
							collection: "users",
							data: {
								pokemons: [
									...(user.pokemons || []),
									{ id: pokemon.id, name: pokemon.name, image: pokemon.sprites.front_default },
								],
							},
							id: user.uid,
						})
					}
				>
					ADD TO TEAM
				</Button>
			)} */}

			<div className="mt-4 flex gap-4">
				<Button variant="outlined" onClick={() => navigate(`/pokemon/${pokemonId}`)}>
					OPEN
				</Button>
				<Button onClick={onClose} loading={isLoading}>
					CLOSE
				</Button>
			</div>
		</div>
	);
};
