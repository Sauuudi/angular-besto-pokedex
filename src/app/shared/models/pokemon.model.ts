export class Pokemon {
  constructor(
      public name: string,
      public id: number,
      public height: number,
      public weight: number,
      public types: any[],
      public abilities: any[],
      public moves: any[],
      public stats: any[],
      public sprites: any,
      public speciesUrl: string,
      public speciesDetails?: PokemonSpecies,
      public evolutionChainID?,
  ) {}
}

export class PokemonSpecies {

}


export interface PokemonList {
  count: number,
  results: {name: string, url: string}[],
}