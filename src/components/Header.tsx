import { Link } from "react-router";

export const Header = () => {
	return (
		<div className="fixed z-20 container w-full rounded-2xl bg-white p-4 shadow-2xl">
			<ul className="flex gap-6 font-medium">
				<Link to="/" className="transition-all hover:text-red-800">
					<li>Pokemons</li>
				</Link>
				<Link to="/pokedex" className="transition-all hover:text-red-800">
					<li>Pokedex</li>
				</Link>
			</ul>
		</div>
	);
};
