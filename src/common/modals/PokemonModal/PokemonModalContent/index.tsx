import React from "react";
import { useNavigate } from "react-router-dom";
import { PokemonTypes } from "../../../../common/pokemon/PokemonTypes";
import { Button, Spinner, Typography } from "../../../index";
import { useRequestPokemonByIdQuery } from "../../../../utils/api/hooks/index";
import { useAuthState } from "../../../../utils/firebase/hooks/index";
import { useUpdateDocumentMutation } from "../../../../utils/firebase/hooks/useUpdateDocumentMutation";

interface PokemonModalContentProps extends Pick<ModalProps, "onClose"> {
	pokemonId: Pokemon["id"];
}

const MAX_USER_POKEMONS = 6; /*Макс кол-во покемонов*/

export const PokemonModalContent: React.FC<PokemonModalContentProps> = ({ pokemonId, onClose }) => {
	const navigate = useNavigate();
	const authState = useAuthState(); /*Получаем состояние авторизации*/
	const requestPokemonByIdQuery = useRequestPokemonByIdQuery({
		id: pokemonId /*Получаем покемона по id*/,
	});

	// Добавление покемона в команду (в firebase)
	const updateDocumentMutation = useUpdateDocumentMutation({
		options: {
			onSuccess: () => {
				onClose();
			},
		},
	});

	// Отображение спинера при загрузке данных
	if (requestPokemonByIdQuery.isLoading || !requestPokemonByIdQuery.data?.data || !authState.data)
		return <Spinner />;

	// Кнопка появления для добавления покемона (если чел зареган и у него не макс кол-во покемонов то он добавляет их в свой pokedex)
	const isShowAddButton =
		authState?.data?.pokemons?.length < MAX_USER_POKEMONS &&
		!authState.data.pokemons.some((pokemon) => pokemon.id === pokemonId);

	// Данные о покемоне через запрос
	const { data: pokemon } = requestPokemonByIdQuery.data;
	const user = authState.data;

	return (
		<div className="mb-2 flex flex-col gap-4">
			<Typography variant="title">{pokemon.name}</Typography>
			<div className="flex justify-center">
				<img className="w-2/3" src={pokemon.sprites.front_default ?? ""} alt="" />
			</div>

			<PokemonTypes types={pokemon.types} />

			{/* Если можно добавить покемона в команду, показываем кнопку */}
			{isShowAddButton && (
				<Button
					loading={requestPokemonByIdQuery.isLoading}
					// Мутируем данные и добавляем покемона в команду пользователя
					onClick={() =>
						updateDocumentMutation.mutate({
							collection: "users",
							data: {
								pokemons: [
									...user.pokemons, // Сохраняем текущих покемонов пользователя
									{ id: pokemon.id, name: pokemon.name, image: pokemon.sprites.front_default },
								],
							},
							id: user.uid, // ID пользователя, для которого обновляется информация
						})
					}
				>
					ADD TO TEAM
				</Button>
			)}
			<div className="flex gap-2">
				<Button variant="outlined" onClick={() => navigate(`/pokemon/${pokemonId}`)}>
					OPEN
				</Button>
				<Button onClick={onClose} loading={requestPokemonByIdQuery.isLoading}>
					CLOSE
				</Button>
			</div>
		</div>
	);
};
