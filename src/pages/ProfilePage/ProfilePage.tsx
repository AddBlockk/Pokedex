import React from "react";
import classnames from "classnames";
import { Button, Spinner, Typography } from "../../common/index";
import { PokemonShortCard } from "../../common/pokemon/index";
import { UserCard } from "../../common/cards/UserCard/UserCard";
// import { INITIAL_STORE, useStore } from "@utils/contexts";
import { useAuthState, useLogoutMutation } from "../../utils/firebase/hooks/index";
import { useDispatch } from "react-redux";
import { authApi, useGetAuthStateQuery } from "../../entities/auth/api/authApi";

export const ProfilePage = () => {
	const dispatch = useDispatch();
	const { data: user, isLoading } = useGetAuthStateQuery();

	React.useEffect(() => {
		dispatch(authApi.util.invalidateTags(["Auth"]));
	}, [dispatch]);

	if (isLoading || !user) return <Spinner />;
	console.log(user);

	return (
		<div className="profile_container flex flex-col gap-4">
			<UserCard user={user} />
			<div>
				<Typography variant="title">Team</Typography>
				<div className="team flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
					{user.pokemons.map((pokemon) => (
						<PokemonShortCard key={pokemon.id} name={pokemon.name} />
					))}
				</div>
			</div>
			<Button
				className="md:hidden lg:hidden"
				onClick={() => {
					dispatch(authApi.endpoints.logIn.initiate({}));
				}}
			>
				LOGOUT
			</Button>
		</div>
	);
};
