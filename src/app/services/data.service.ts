import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  //get pokemons
   getPokemonsList() {
     return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=721`);
  }

  //get more pokemon data
  getPokemon(name: String) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
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
