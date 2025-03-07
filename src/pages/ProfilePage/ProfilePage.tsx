import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Button, Spinner, Typography } from "../../common/index";
import { PokemonShortCard } from "../../common/pokemon/index";
import { UserCard } from "../../common/cards/UserCard/UserCard";
import { useAuthState, useLogoutMutation } from "../../utils/firebase/hooks/index";
import { authApi } from "../../entities/auth/api/authApi";

export const ProfilePage = () => {
	const dispatch = useDispatch();
	const { data: user, isLoading } = useAuthState();

	React.useEffect(() => {
		dispatch(authApi.util.invalidateTags(["Auth"]));
	}, [dispatch]);

	if (isLoading || !user) return <Spinner />;

	return (
		<div className="profile_container flex flex-col gap-4 text-slate-800 dark:text-white">
			<div>
				<UserCard user={user} />
				<Typography variant="title">Team</Typography>
				<div className="team flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
					{user.pokemons.map((pokemon) => (
						<PokemonShortCard key={pokemon.id} name={pokemon.name} />
					))}
				</div>
			</div>
		</div>
	);
};
