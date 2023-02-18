import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, TypeColor, TypeColorFilter } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  imgLink: string;
  pokemonId: string;

  ngOnInit(): void {
    this.imgLink = `assets/defualt-compressed-images/${this.pokemon.id}.png`;
    this.pokemonId = this.pokemon?.id.toString();
  }

  setCardBackgroundColor(color: string): any {
    color = TypeColor[color] ?? 'white';
    const style = {
      background: color,
    };
    return style;
  }

  setIdColor(color: string): any {
    color = TypeColor[color] ?? 'white';
    const style = {
      color: color,
    };
    return style;
  }

  setPokeballColor(filter: string): any {
    const colorFilter = TypeColorFilter[filter] ?? 'white';
    const style = {
      filter: colorFilter,
    };
    return style;
  }
}
