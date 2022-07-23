import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css'],
})
export class PokemonInfoComponent implements OnInit {
  pokemon: any;
  pokemonId: any;
  evoChain: any;
  imgLink: String = '';
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.pokemonId = paramMap.get('id');
    });
    this.dataService.getPokemon(this.pokemonId).subscribe((response: any) => {
      this.pokemon = response;
    });

    this.http
      .get(`https://pokeapi.co/api/v2/pokemon-species/` + this.pokemonId)
      .subscribe((response: any) => {
        this.http.get(response.evolution_chain.url).subscribe((response2) => {
          this.evoChain = response2;
        });
      });

    this.imgLink =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
      this.pokemonId +
      '.png';
  }
}
