import classnames from "classnames";
import { getTypeColor } from "../../types/color";

interface PokemonTypeProps {
	type: string;
}

export const PokemonType: React.FC<PokemonTypeProps> = ({ type }) => {
	return (
		<span className={`rounded-md px-2 py-1 text-white ${getTypeColor(type)}`}>
			{type.toUpperCase()}
		</span>
	);
};
