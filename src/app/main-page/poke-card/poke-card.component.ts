import { Component, Input, OnInit, Type } from '@angular/core';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.css'],
})
export class PokeCardComponent implements OnInit {
  @Input() pokemon: any;
  imgLink: any;

  constructor() {}

  ngOnInit(): void {
    this.imgLink =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
      this.pokemon.id +
      '.png';
  }

  setPokemonCardColor(color: string): any {
    color = TypeColor[color] ?? 'white';
    const style = {
      background: color,
    };
    return style;
  }
  setPokemonNameColor(color: string): any {
    color = TypeColor[color] ?? 'white';
    const style = {
      background: color,
      
    };
    return style;
  }

  setPokemonBackColor(filter: string): any {
    var filterr = TypeColorFilter[filter] ?? 'white';

    const style = {
      filter: filterr,
    };
    return style;
  }
}
export enum TypeColor {
  normal = '#cfcfcc',
  fire = '#e04a24',
  water = '#4c82f5',
  electric = '#fcd83a',
  grass = '#3ccc31',
  ice = '#89faf3',
  fighting = '#a1592d',
  poison = '#a148a1',
  ground = '#dbb148',
  flying = '#a6adff',
  psychic = '#fa7099',
  bug = '#c3d446',
  rock = '#a8925b',
  ghost = '#6e408f',
  dragon = '#9f79fc',
  dark = '#524841',
  steel = '#6f6f70',
  fairy = '#ffb8dd',
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
