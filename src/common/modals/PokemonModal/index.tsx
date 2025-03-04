import React from "react";
import { Modal } from "../Modal";
import { ModalProps } from "../../../../@types/data";
import { Pokemon } from "../../../../@types/data";
import { PokemonModalContent } from "./PokemonModalContent";

interface PokemonModalProps {
	isShowing: boolean;
	pokemonId: number | null;
	onClose: () => void;
}

interface PokemonModalProps extends Omit<ModalProps, "children" | "loading"> {
	pokemonId: Pokemon["id"] | null;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({ pokemonId, onClose, ...props }) => (
	<Modal {...props} onClose={onClose}>
		{pokemonId && <PokemonModalContent pokemonId={pokemonId} onClose={onClose} />}
	</Modal>
);
