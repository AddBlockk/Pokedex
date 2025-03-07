import React from "react";
import { UserCard } from "../../common/cards/UserCard/UserCard";
import { useUsersCollection } from "../../utils/firebase/hooks/index";

export const UsersPage = () => {
	const usersCollection = useUsersCollection();

	if (usersCollection.isLoading || !usersCollection.data) return null;
	const { data: users } = usersCollection;

	const usersWithPokemons = users.filter((user) => user.pokemons && user.pokemons.length > 0);

	return (
		<div className="page">
			<div className="grid grid-cols-1 gap-3 text-slate-800 md:grid-cols-2 xl:grid-cols-3 dark:text-white">
				{usersWithPokemons.map((user) => (
					<UserCard key={user.uid} user={user} />
				))}
			</div>
		</div>
	);
};
