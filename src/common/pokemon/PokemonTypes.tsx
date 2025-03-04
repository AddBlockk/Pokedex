import { PokemonType } from "../../../@types/data";
import { typeColors } from "../../types/color";

interface PokemonTypesProps {
	types: PokemonType[];
}

export const PokemonTypes: React.FC<PokemonTypesProps> = ({ types }) => (
	<ul className="mt-[5px] flex gap-[5px]">
		{types.map(({ type }) => (
			<li
				key={type.name}
				className={`flex rounded-full border border-gray-300 px-3 py-1 text-[12px] text-white capitalize ${typeColors[type.name] || "bg-gray-400"}`}
			>
				{type.name}
			</li>
		))}
	</ul>
);
