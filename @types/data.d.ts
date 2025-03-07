type User = {
	isLoginIn: User | null | undefined;
	city: string;
	displayName: Include<import("firebase/auth").User["displayName"], string>;
	email: Include<import("firebase/auth").User["email"], string>;
	// phoneNumber: import("firebase/auth").User["phoneNumber"];
	photoURL: import("firebase/auth").User["photoURL"];
	uid: import("firebase/auth").User["uid"];
	pokemons: {
		name: Pokemon["name"];
		id: Pokemon["id"];
		image: Pokemon["sprites"]["front_default"];
	}[];
	data: T | null;
	phoneNumber?: string;
};
interface ModalProps {
	isShowing: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

interface UserDocument extends User {}

interface PokemonDocument {
	uid: User["uid"];
	name: Pokemon["name"];
	id: Pokemon["id"];
}

interface Pokemon {
	/** The identifier for this resource */
	id: number;
	/** The name for this resource */
	name: string;
	/** The base experience gained for defeating this Pokémon */
	base_experience: number;
	/** The height of this Pokémon in decimetres */
	height: number;
	/** Set for exactly one Pokémon used as the default for each species */
	is_default: boolean;
	/** Order for sorting. Almost national order, except families are grouped together */
	order: number;
	/** The weight of this Pokémon in hectograms */
	weight: number;
	/** A list of abilities this Pokémon could potentially have */
	abilities: PokemonAbility[];
	/** A list of forms this Pokémon can take on */
	forms: NamedAPIResource[];
	/** A list of game indices relevent to Pokémon item by generation */
	// game_indices: VersionGameIndex[];
	/** A list of items this Pokémon may be holding when encountered */
	held_items: PokemonHeldItem[];
	/** A link to a list of location areas, as well as encounter details pertaining to specific versions */
	location_area_encounters: string;
	/** A list of moves along with learn methods and level details pertaining to specific version groups */
	moves: PokemonMove[];
	/** A set of sprites used to depict this Pokémon in the game.
	 * A visual representation of the various sprites can be found at [PokeAPI/sprites](https://github.com/PokeAPI/sprites#sprites)
	 */
	sprites: PokemonSprites;
	/** The species this Pokémon belongs to */
	species: NamedAPIResource;
	/** A list of base stat values for this Pokémon */
	stats: PokemonStat[];
	/** A list of details showing types this Pokémon has */
	types: PokemonType[];
	/** Data describing a Pokemon's types in a previous generation. */
	past_types: PokemonPastType[];
}

interface PokemonAbility {
	/** Whether or not this is a hidden ability */
	is_hidden: boolean;
	/** The slot this ability occupies in this Pokémon species */
	slot: number;
	/** The ability the Pokémon may have */
	ability: NamedAPIResource;
}

interface NamedAPIResource {
	name: string;
	url: string;
}

interface PokemonHeldItem {
	/** The item the referenced Pokémon holds */
	item: NamedAPIResource;
	/** The details of the different versions in which the item is held */
	version_details: PokemonHeldItemVersion[];
}

/**
 * The details of the different versions in which the item is held
 */
interface PokemonHeldItemVersion {
	/** The version in which the item is held */
	version: NamedAPIResource;
	/** How often the item is held */
	rarity: number;
}

interface PokemonMove {
	/** The move the Pokémon can learn */
	move: NamedAPIResource;
	/** The details of the version in which the Pokémon can learn the move */
	version_group_details: PokemonMoveVersion[];
}

/**
 * The details of the version in which the Pokémon can learn the move
 */
interface PokemonMoveVersion {
	/** The method by which the move is learned */
	move_learn_method: NamedAPIResource;
	/** The version group in which the move is learned */
	version_group: NamedAPIResource;
	/** The minimum level to learn the move */
	level_learned_at: number;
}

interface PokemonSprites {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
	/** The shiny female depiction of this Pokémon from the front in battle */
	front_shiny_female: string | null;
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The female depiction of this Pokémon from the back in battle */
	back_female: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	back_shiny_female: string | null;
	/** Dream World, Official Artwork and Home sprites */
	other: OtherPokemonSprites;
	/** Version Sprites of this Pokémon */
	versions: VersionSprites;
}

/** Other Pokemon Sprites (Dream World and Official Artwork sprites) */
interface OtherPokemonSprites {
	/** Dream World Sprites of this Pokémon */
	dream_world: DreamWorld;
	/** Official Artwork Sprites of this Pokémon */
	"official-artwork": OfficialArtwork;
	/** Home Artwork Sprites of this Pokémon */
	home: Home;
}

interface OfficialArtwork {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
}

interface Home {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	front_shiny_female: string | null;
}

interface PokemonStat {
	/** The stat the Pokémon has */
	stat: NamedAPIResource;
	/** The effort points (EV) the Pokémon has in the stat */
	effort: number;
	/** The base value of the stat */
	base_stat: number;
}

interface PokemonType {
	/** The order the Pokémon's types are listed in */
	slot: number;
	/** The type the referenced Pokémon has */
	type: NamedAPIResource;
}

/**
 * Data describing a Pokemon's types in a previous generation.
 */
interface PokemonPastType {
	/** The generation of this Pokémon Type. */
	generation: NamedAPIResource;
	/** Types this of this Pokémon in a previos generation. */
	types: PokemonType[];
}

interface VersionSprites {
	/** Generation-I Sprites of this Pokémon */
	"generation-i": GenerationISprites;
	/** Generation-II Sprites of this Pokémon */
	"generation-ii": GenerationIISprites;
	/** Generation-III Sprites of this Pokémon */
	"generation-iii": GenerationIIISprites;
	/** Generation-IV Sprites of this Pokémon */
	"generation-iv": GenerationIVSprites;
	/** Generation-V Sprites of this Pokémon */
	"generation-v": GenerationVSprites;
	/** Generation-VI Sprites of this Pokémon */
	"generation-vi": GenerationVISprites;
	/** Generation-VII Sprites of this Pokémon */
	"generation-vii": GenerationVIISprites;
	/** Generation-VIII Sprites of this Pokémon */
	"generation-viii": GenerationVIIISprites;
}

interface GenerationISprites {
	/** Red-blue sprites of this Pokémon */
	"red-blue": RedBlue;
	/** Yellow sprites of this Pokémon  */
	yellow: Yellow;
}

interface GenerationIISprites {
	/** Crystal sprites of this Pokémon */
	crystal: Crystal;
	/** Gold sprites of this Pokémon */
	gold: Gold;
	/** Silver sprites of this Pokémon */
	silver: Silver;
}

interface GenerationIIISprites {
	/** Emerald sprites of this Pokémon */
	emerald: Emerald;
	/** Firered-Leafgreen sprites of this Pokémon */
	"firered-leafgreen": FireredLeafgreen;
	/** Ruby-Sapphire sprites of this Pokémon */
	"ruby-sapphire": RubySapphire;
}

interface GenerationVISprites {
	/** Omegaruby-Alphasapphire sprites of this Pokémon */
	"omegaruby-alphasapphire": OmegarubyAlphasapphire;
	/** X-Y sprites of this Pokémon */
	"x-y": XY;
}

interface GenerationVIISprites {
	/** Icon sprites of this Pokémon */
	icons: GenerationViiIcons;
	/** Ultra-sun-ultra-moon sprites of this Pokémon */
	"ultra-sun-ultra-moon": UltraSunUltraMoon;
}

interface GenerationVIIISprites {
	/** Icon sprites of this Pokémon */
	icons: GenerationViiiIcons;
}

interface GenerationViiiIcons {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
}

interface GenerationViiIcons {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
}

interface UltraSunUltraMoon {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	front_shiny_female: string | null;
}

interface OmegarubyAlphasapphire {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	front_shiny_female: string | null;
}

interface XY {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	front_shiny_female: string | null;
}

interface GenerationIVSprites {
	/** Diamond-pearl Generation sprites of this Pokémon */
	"diamond-pearl": DiamondPearl;
	/** Heartgold-Soulsilver sprites of this Pokémon */
	"heartgold-soulsilver": HeartgoldSoulsilver;
	/** Platinum sprites of this Pokémon */
	platinum: Platinum;
}

interface RedBlue {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The gray depiction of this Pokémon from the back in battle */
	back_gray: string | null;
	/** The transparent depiction of this Pokémon from the back in battle */
	back_transparent: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The gray depiction of this Pokémon from the front in battle */
	front_gray: string | null;
	/** The transparent depiction of this Pokémon from the front in battle */
	front_transparent: string | null;
}

interface Yellow {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The gray depiction of this Pokémon from the back in battle */
	back_gray: string | null;
	/** The transparent depiction of this Pokémon from the back in battle */
	back_transparent: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The gray depiction of this Pokémon from the front in battle */
	front_gray: string | null;
	/** The transparent depiction of this Pokémon from the front in battle */
	front_transparent: string | null;
}

interface Crystal {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The back shiny transparent depiction of this Pokémon from the back in battle */
	back_shiny_transparent: string | null;
	/** The transparent depiction of this Pokémon from the back in battle */
	back_transparent: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The front shiny transparent depiction of this Pokémon from the front in battle */
	front_shiny_transparent: string | null;
	/** The transparent depiction of this Pokémon from the front in battle */
	front_transparent: string | null;
}

interface Gold {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The transparent depiction of this Pokémon from the front in battle */
	front_transparent: string | null;
}

/** Silver sprites */
interface Silver {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The transparent depiction of this Pokémon from the front in battle */
	front_transparent: string | null;
}

interface Emerald {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
}

/** FireRead LeafGreen sprites  */
interface FireredLeafgreen {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
}

/** Ruby/Sapphire sprites */
interface RubySapphire {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
}

interface DreamWorld {
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
}

interface DiamondPearl {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The female depiction of this Pokémon from the back in battle */
	back_female: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	back_shiny_female: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	front_shiny_female: string | null;
}

interface HeartgoldSoulsilver {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The female depiction of this Pokémon from the back in battle */
	back_female: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	back_shiny_female: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	front_shiny_female: string | null;
}

interface Platinum {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The female depiction of this Pokémon from the back in battle */
	back_female: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	back_shiny_female: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	front_shiny_female: string | null;
}

interface GenerationVSprites {
	/** Black-white sprites of this Pokémon */
	"black-white": BlackWhite;
}

/** Black/White sprites */
interface BlackWhite {
	/** The animated sprite of this pokémon */
	animated: Animated;
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The female depiction of this Pokémon from the back in battle */
	back_female: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	back_shiny_female: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	front_shiny_female: string | null;
}

interface Animated {
	/** The default depiction of this Pokémon from the back in battle */
	back_default: string | null;
	/** The shiny depiction of this Pokémon from the back in battle */
	back_shiny: string | null;
	/** The female depiction of this Pokémon from the back in battle */
	back_female: string | null;
	/** The default depiction of this Pokémon from the front in battle */
	front_default: string | null;
	/** The shiny depiction of this Pokémon from the front in battle */
	front_shiny: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	back_shiny_female: string | null;
	/** The female depiction of this Pokémon from the front in battle */
	front_female: string | null;
	/** The shiny female depiction of this Pokémon from the back in battle */
	front_shiny_female: string | null;
}

interface EvolutionDetail {
	/** The item required to cause evolution this into Pokémon species. */
	item: NamedAPIResource | null;
	/** The type of event that triggers evolution into this Pokémon species. */
	trigger: NamedAPIResource;
	/** The id of the gender of the evolving Pokémon species must be in order to evolve into this Pokémon species. */
	gender: number | null;
	/** The item the evolving Pokémon species must be holding during the evolution trigger event to evolve into this Pokémon species. */
	held_item: NamedAPIResource | null;
	/** The move that must be known by the evolving Pokémon species during the evolution trigger event in order to evolve into this Pokémon species. */
	known_move: NamedAPIResource | null;
	/** The evolving Pokémon species must know a move with this type during the evolution trigger event in order to evolve into this Pokémon species. */
	known_move_type: NamedAPIResource | null;
	/** The location the evolution must be triggered at. */
	location: NamedAPIResource | null;
	/** The minimum required level of the evolving Pokémon species to evolve into this Pokémon species. */
	min_level: number | null;
	/** The minimum required level of happiness the evolving Pokémon species to evolve into this Pokémon species. */
	min_happiness: number | null;
	/** The minimum required level of beauty the evolving Pokémon species to evolve into this Pokémon species. */
	min_beauty: number | null;
	/** The minimum required level of affection the evolving Pokémon species to evolve into this Pokémon species. */
	min_affection: number | null;
	/** Whether or not it must be raining in the overworld to cause evolution this Pokémon species. */
	needs_overworld_rain: boolean;
	/** The Pokémon species that must be in the players party in order for the evolving Pokémon species to evolve into this Pokémon species. */
	party_species: NamedAPIResource | null;
	/**
	 * The player must have a Pokémon of this type in their party during the evolution trigger event
	 * in order for the evolving Pokémon species to evolve into this Pokémon species.
	 */
	party_type: NamedAPIResource | null;
	/** The required relation between the Pokémon's Attack and Defense stats. 1 means Attack > Defense. 0 means Attack = Defense. -1 means Attack < Defense. */
	relative_physical_stats: 1 | 0 | -1 | null;
	/** The required time of day. Day or night. */
	time_of_day: "Day" | "Night" | "";
	/** Pokémon species for which this one must be traded. */
	trade_species: NamedAPIResource | null;
	/** Whether or not the 3DS needs to be turned upside-down as this Pokémon levels up. */
	turn_upside_down: boolean;
}

/**
 * ## Chain Link
 * Contains evolution details for a Pokémon in the chain.
 * Each link references the next Pokémon in the natural evolution order
 */
interface ChainLink {
	/** Whether or not this link is for a baby Pokémon. This would only ever be true on the base link */
	is_baby: boolean;
	/** The Pokémon species at this point in the evolution chain */
	species: NamedAPIResource;
	/** All details regarding the specific details of the referenced Pokémon species evolution */
	evolution_details: EvolutionDetail[];
	/** A List of chain objects */
	evolves_to: ChainLink[];
}

/**
 * ## Evolution Chain
 * Evolution chains are essentially family trees.
 * They start with the lowest stage within a family and detail
 * evolution conditions for each as well as Pokémon they can evolve
 * into up through the hierarchy.
 */
interface EvolutionChain {
	/** The identifier for this resource */
	id: number;
	/**
	 * The item that a Pokémon would be holding when mating that would trigger
	 * the egg hatching a baby Pokémon rather than a basic Pokémon
	 */
	baby_trigger_item: NamedAPIResource | null;
	/**
	 * The base chain link object. Each link contains evolution details for a Pokémon in the chain.
	 * Each link references the next Pokémon in the natural evolution order
	 */
	chain: ChainLink;
}

/**
 * ## Evolution Trigger
 * Evolution triggers are the events and conditions that cause a Pokémon to evolve.
 * There are numerous methods of evolution which define how and when Pokémon evolve.
 * Most Pokémon will evolve by leveling up while others evolve through specific means,
 * such as being traded, achieving a certain amount of friendship or leveling at certain times, among others.
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution) for greater detail.
 */
interface EvolutionTrigger {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: "level-up" | "trade" | "use-item" | "shed" | "other";
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of pokemon species that result from this evolution trigger. */
	pokemon_species: NamedAPIResource[];
}

interface LocationAreaEncounter {
	/** The location area the referenced Pokémon can be encountered in */
	location_area: NamedAPIResource;
	/** A list of versions and encounters with the referenced Pokémon that might happen */
	version_details: VersionEncounterDetail[];
}

interface UseLogInWithEmailAndPasswordMutationParams {
	email: string;
	password: string;
}

interface UseRegisterWithEmailAndPasswordMutation {
	email: string;
	password: string;
}

interface NamedAPIResourceList {
	count: number;
	next: string | null;
	previous: string | null;
	results: NamedAPIResource[];
}

interface APIResource {
	url: string;
}
