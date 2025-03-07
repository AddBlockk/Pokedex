import { useNavigate } from "react-router-dom";

interface UserCardProps {
	user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
	const navigate = useNavigate();
	const { pokemons } = user;

	return (
		<div className="mb-[20px] flex flex-col gap-5 rounded-lg bg-white p-5 shadow-lg dark:bg-slate-500">
			<div className="flex gap-5">
				{user.photoURL && (
					<img src={user.photoURL} alt="User Avatar" className="h-20 w-20 rounded-lg" />
				)}

				<div className="inline-flex max-w-full flex-col">
					<div className="inline-flex overflow-hidden text-2xl font-light text-ellipsis whitespace-nowrap">
						{user.displayName}
					</div>
					<div className="overflow-hidden text-lg font-normal whitespace-nowrap">{user.email}</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-3 rounded-lg bg-blue-100 p-3 dark:bg-slate-600">
				{pokemons.map((pokemon) => (
					<div key={pokemon.id} className="flex justify-center">
						<div
							role="button"
							tabIndex={0}
							className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-blue-300 dark:border-blue-600"
							onKeyPress={(event) => {
								if (event.key === "Enter") navigate(`/pokemon/${pokemon.id}`);
							}}
							onClick={() => navigate(`/pokemon/${pokemon.id}`)}
						>
							<img src={pokemon.image || ""} alt={pokemon.name} className="scale-150" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
