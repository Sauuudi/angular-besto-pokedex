import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css'],
})
export class PokemonInfoComponent implements OnInit {
  pokemon: any;
  pokemonId: any;
  imgLink: String = '';
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.pokemonId = paramMap.get('id');
    });
    this.dataService.getPokemon(this.pokemonId).subscribe((response: any) => {
      this.pokemon = response;
      console.log('el pokemon se ha recuperado bien??: ' + this.pokemon);
    });
    console.log('pkeid es: ' + this.pokemonId);

    this.imgLink =
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
      String(this.pokemonId).padStart(3, '0') +
      '.png';
  }
}
