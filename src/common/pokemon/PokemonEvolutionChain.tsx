import React, { useEffect, useState } from "react";
import { useRequestEvolutionChainQuery } from "../../utils/api/hooks/useRequestEvolutionChainQuery";
import { Typography } from "../Typography";
import { PokemonShortCard } from "./PokemonShortCard";

interface PokemonEvolutionChainProps {
	chainId: number;
	pokemonName: string;
}

export const PokemonEvolutionChain: React.FC<PokemonEvolutionChainProps> = ({
	chainId,
	pokemonName,
}) => {
	const { data: evolutionChainData, isLoading: evolutionChainLoading } =
		useRequestEvolutionChainQuery({
			id: chainId,
		});

	const [pokemonImages, setPokemonImages] = useState<{ name: string; image: string }[]>([]);
	const [loadingImages, setLoadingImages] = useState<boolean>(true);

	const isEvolutionChainData = !!evolutionChainData && !evolutionChainLoading;
	if (!isEvolutionChainData) return null;

	const evolutionChain = evolutionChainData?.data?.chain;
	if (!evolutionChain) return null;

	// Создаём структуру для цепочки эволюции
	const pokemonChain = {
		prev: evolutionChain,
		next: evolutionChain.evolves_to,
	};

	// Загружаем изображения для каждого покемона в цепочке эволюции
	useEffect(() => {
		const fetchPokemonImages = async () => {
			// Создаем массив для всех покемонов в цепочке
			const allEvolutions = [pokemonChain.prev, ...pokemonChain.next];

			// Получаем изображения для каждого покемона
			const images = await Promise.all(
				allEvolutions.map(async (chainNode: any) => {
					const response = await fetch(chainNode.species.url);
					const speciesData = await response.json();
					const pokemonResponse = await fetch(speciesData.pokemon.url);
					const pokemonData = await pokemonResponse.json();

					// Возвращаем данные о покемоне: имя и его изображение
					return {
						name: chainNode.species.name,
						image: pokemonData.sprites.front_default,
					};
				}),
			);
			setPokemonImages(images); // Обновляем состояние с изображениями
			setLoadingImages(false); // Завершаем загрузку
		};

		fetchPokemonImages();
	}, [pokemonChain]);

	// Пока изображения загружаются, показываем сообщение
	if (loadingImages) {
		return <Typography>Loading evolution images...</Typography>;
	}

	return (
		<div className="flex flex-col gap-3 py-5">
			{/* Показываем предыдущие эволюции, если они есть */}
			{!!pokemonChain.prev && (
				<>
					<Typography variant="title">Previous evolution</Typography>
					<div className="mt-2 flex flex-col justify-between gap-4">
						<PokemonShortCard
							name={pokemonChain.prev.species.name}
							image={
								pokemonImages.find((img) => img.name === pokemonChain.prev.species.name)?.image
							}
						/>
					</div>
				</>
			)}

			{/* Показываем следующие эволюции */}
			{!!pokemonChain.next.length && (
				<>
					<Typography variant="title">Next evolution(s)</Typography>
					<div className="mt-2 flex flex-col justify-between gap-4">
						{pokemonChain.next.map((evolution: any) => (
							<PokemonShortCard
								key={evolution.species.name}
								name={evolution.species.name}
								image={pokemonImages.find((img) => img.name === evolution.species.name)?.image}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};
