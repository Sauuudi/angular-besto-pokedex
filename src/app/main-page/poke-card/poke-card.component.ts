import { Component, Input, OnInit } from '@angular/core';

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
}
