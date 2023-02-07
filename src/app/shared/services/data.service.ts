import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAX_POKEMON_NUMBER, Pokemon, PokemonList } from '../models/pokemon.model';
import { map } from 'rxjs';

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

  private getRawAllPokemonData(pokemonCount: number) {
    return this.http.get<PokemonList>(
      `https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}`
    );
  }

  private createPokemonList(rawPokemonList: PokemonList) {
    const pokemonList: Pokemon[] = [];
    rawPokemonList.results.forEach((pokemon) => {
      this.getPokemon(pokemon.name)
        .pipe(
          map(
            (pokemon) =>
              new Pokemon(
                pokemon.name,
                pokemon.id,
                pokemon.height,
                pokemon.weight,
                pokemon.types,
                pokemon.abilities,
                pokemon.moves,
                pokemon.stats,
                pokemon.sprites,
                pokemon.species.url
              )
          )
        )
        .subscribe((pokemon) => {
          pokemonList.push(pokemon);
        });
    });
    return pokemonList;
  }
  // make private
  getPokemon(name: String) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  //get pokemon species
  getPokemonSpecies(id: any) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  }

  //get Pokemon evolution chain
  getEvolutionChain(url: any) {
    return this.http.get(url);
  }
}
