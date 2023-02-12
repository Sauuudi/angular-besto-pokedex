import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Pokemon, TypeColorFilter } from '../shared/models/pokemon.model';
@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss'],
})
export class PokemonInfoComponent implements OnInit {
  pokemon: any;
  pokemonId: any;
  mainImageLink: String = '';

  evolutionChainInfo: any = [];
  evolutionImagesLinks: any = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.pokemonId = this.route.snapshot.paramMap.get('id');
    // unsuscribe on destroy
    await this.dataService.getPokemon(this.pokemonId, true).subscribe((pokemon: Pokemon) => {
        console.log(pokemon);
        this.pokemon = pokemon;
      });

    //this.mainImageLink = 'assets/pokemon_images_compressed/' + this.pokemonId+ '.png';
    this.mainImageLink =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
      this.pokemonId +
      '.png';
  }

  getImage(id: any) {
    return 'assets/pokemon_images_compressed/' + id + '.png';
    // 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
    // id +
    // '.png'
  }

  setPokemonBackColor(filter: string): any {
    var filterr = TypeColorFilter[filter] ?? 'white';

    const style = {
      filter: filterr,
    };
    return style;
  }
}
