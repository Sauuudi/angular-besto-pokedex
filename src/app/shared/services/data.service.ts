import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MAX_POKEMON_NUMBER,
  Pokemon,
  PokemonEvolutionChain,
  PokemonExtras,
  PokemonList,
  PokemonSpeciesDetails,
} from '../models/pokemon.model';
import { forkJoin, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  async getPokemonList(numPokemonsToGet: number = MAX_POKEMON_NUMBER) {
    return await new Promise((resolve, reject) => {
      this.getRawAllPokemonData(numPokemonsToGet)
        .pipe(
          map((pokemonsUrlsAndNames) => {
            return this.createPokemonList(pokemonsUrlsAndNames);
          })
        )
        .subscribe((pokemonList: Pokemon[]) => {
          resolve(pokemonList);
        });
    });
  }

  getPokemon(idOrName: string, extras = false) {
    return this.http
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
      .pipe(
        map((pokemonFromApi: any) => {
          const newPokemon: Pokemon = {
            name: pokemonFromApi.name,
            id: pokemonFromApi.id,
            height: pokemonFromApi.height,
            weight: pokemonFromApi.weight,
            types: pokemonFromApi.types,
            abilities: pokemonFromApi.abilities,
            moves: pokemonFromApi.moves,
            stats: pokemonFromApi.stats,
            sprites: pokemonFromApi.sprites,
          };
          if (extras) {
            this.getPokemonExtras(pokemonFromApi.id).subscribe(
              (extras: PokemonExtras) => {
                newPokemon.speciesDetails = extras.speciesDetails;
                newPokemon.evolutionChain = extras.evolutionChain;
              }
            );
          }
          return newPokemon;
        })
      );
  }

  private getRawAllPokemonData(pokemonCount: number) {
    return this.http.get<PokemonList>(
      `https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}`
    );
  }

  private createPokemonList(rawPokemonList: PokemonList) {
    const pokemonListToReturn: Pokemon[] = [];
    rawPokemonList.results.forEach((pokemonResult) => {
      this.getPokemon(pokemonResult.name).subscribe((pokemon: Pokemon) => {
        pokemonListToReturn.push(pokemon);
      });
    });
    return pokemonListToReturn;
  }

  private getPokemonExtras(idOrName: string) {
    return forkJoin({
      speciesDetails: this.getPokemonSpecies(idOrName),
      evolutionChain: this.getEvolutionChain(idOrName)
    }
    );
  }

  private getPokemonSpecies(idOrName: string) {
    return this.http
      .get(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}`)
      .pipe(
        map((pokemonSpeciesFromApi: any) => {
          const pokemonSpecies: PokemonSpeciesDetails = {
            evolutionChainUrl: pokemonSpeciesFromApi.evolution_chain.url,
          };
          return pokemonSpecies;
        })
      );
  }

  private getEvolutionChain(idOrName: string) {
    return this.getPokemonSpecies(idOrName).pipe(
      mergeMap((pokemonSpecies) =>
        this.http.get(pokemonSpecies.evolutionChainUrl)
      ),
      map((evolutionChainFromApi: any) => {
        const pokemonChain: PokemonEvolutionChain = {
          chain: evolutionChainFromApi,
        };        
        return pokemonChain;
      })
    );
  }
}
