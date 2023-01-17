import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonList } from '../models/pokemon.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  pokemonLimit = 721;
  availablePokemonCount = 0;

  pokemonList: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  getPokemonList(numPokemonsToGet: number = this.pokemonLimit) {
    this.pokemonList = [];
    return this.getRawAllPokemonData(numPokemonsToGet)
    .pipe(
      map( pokemonsUrlsAndNames => {
        this.availablePokemonCount = pokemonsUrlsAndNames.count;
        return this.createPokemonList(pokemonsUrlsAndNames);
      })
    )
  }

  private getRawAllPokemonData(pokemonCount: number) {
    return this.http.get<PokemonList>(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}`);
  }

  private createPokemonList(pokemonList : PokemonList) {
    pokemonList.results.forEach( pokemon => {
      this.getPokemon(pokemon.name).pipe(
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
      .subscribe( pokemon => {
        this.pokemonList.push(pokemon);
      });
    });
    return this.pokemonList;        
  }
  // make private
  getPokemon(name: String) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  //get pokemon species
  getPokemonSpecies(id : any){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  }

  //get Pokemon evolution chain
  getEvolutionChain(url : any){
    return  this.http.get(url)
  }
}
