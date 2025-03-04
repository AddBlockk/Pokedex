interface PokemonAbilitiesProps {
	abilities: { ability: { name: string } }[];
}

export const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({ abilities }) => (
	<div>
		<div className="text-[20px] font-bold">Навыки</div>
		<ul className="mt-[10px] flex flex-col gap-[5px]">
			{abilities.map(({ ability }) => (
				<li key={ability.name} className="flex border-b border-gray-300 pb-1 capitalize">
					{ability.name}
				</li>
			))}
		</ul>
	</div>
);
