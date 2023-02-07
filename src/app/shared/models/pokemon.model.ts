export interface Pokemon {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: any[];
  abilities: any[];
  moves: any[];
  stats: any[];
  sprites: any;
  speciesDetails?: PokemonSpeciesDetails;
  evolutionChain?: PokemonEvolutionChain;
}

export interface PokemonSpeciesDetails {
  evolutionChainUrl: string;
}
export interface PokemonEvolutionChain {
  chain: any;
}

export interface PokemonExtras {
  speciesDetails: PokemonSpeciesDetails;
  evolutionChain: PokemonEvolutionChain;
}

export interface PokemonList {
  count: number;
  results: { name: string; url: string }[];
}

export enum TypeColor {
  normal = '#AAA67F',
  fire = '#F57D31',
  water = '#6493EB',
  electric = '#F9CF30',
  grass = '#74CB48',
  ice = '#9AD6DF',
  fighting = '#C12239',
  poison = '#A43E9E',
  ground = '#DEC16B',
  flying = '#A891EC',
  psychic = '#FB5584',
  bug = '#A7B723',
  rock = '#B69E31',
  ghost = '#70559B',
  dragon = '#7037FF',
  dark = '#75574C',
  steel = '#B7B9D0',
  fairy = '#E69EAC',
}

export enum TypeColorFilter {
  normal = 'invert(100%) sepia(1%) saturate(786%) hue-rotate(1deg) brightness(90%) contrast(78%)',
  fire = 'invert(34%) sepia(24%) saturate(4646%) hue-rotate(348deg) brightness(97%) contrast(91%)',
  water = 'invert(44%) sepia(100%) saturate(1892%) hue-rotate(204deg) brightness(97%) contrast(97%)',
  electric = 'invert(85%) sepia(78%) saturate(3698%) hue-rotate(325deg) brightness(104%) contrast(98%)',
  grass = 'invert(67%) sepia(96%) saturate(1353%) hue-rotate(64deg) brightness(93%) contrast(84%)',
  ice = 'invert(79%) sepia(72%) saturate(239%) hue-rotate(115deg) brightness(104%) contrast(96%)',
  fighting = 'invert(37%) sepia(44%) saturate(727%) hue-rotate(339deg) brightness(97%) contrast(92%)',
  poison = 'invert(36%) sepia(12%) saturate(3294%) hue-rotate(252deg) brightness(99%) contrast(87%)',
  ground = 'invert(89%) sepia(10%) saturate(3119%) hue-rotate(339deg) brightness(92%) contrast(85%)',
  flying = 'invert(64%) sepia(76%) saturate(1216%) hue-rotate(198deg) brightness(105%) contrast(102%)',
  psychic = 'invert(64%) sepia(18%) saturate(4761%) hue-rotate(303deg) brightness(102%) contrast(96%)',
  bug = 'invert(80%) sepia(81%) saturate(372%) hue-rotate(11deg) brightness(90%) contrast(90%)',
  rock = 'invert(58%) sepia(71%) saturate(252%) hue-rotate(5deg) brightness(89%) contrast(82%)',
  ghost = 'invert(26%) sepia(71%) saturate(728%) hue-rotate(236deg) brightness(93%) contrast(85%)',
  dragon = 'invert(77%) sepia(45%) saturate(7233%) hue-rotate(219deg) brightness(94%) contrast(110%)',
  dark = 'invert(29%) sepia(11%) saturate(583%) hue-rotate(342deg) brightness(91%) contrast(92%)',
  steel = 'invert(45%) sepia(5%) saturate(81%) hue-rotate(202deg) brightness(94%) contrast(86%)',
  fairy = 'invert(80%) sepia(14%) saturate(991%) hue-rotate(291deg) brightness(99%) contrast(106%)',
}

export const MAX_POKEMON_NUMBER: number = 721;