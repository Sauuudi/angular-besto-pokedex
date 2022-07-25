import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0 )' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('rotated => default', animate('0.4s')),
      transition('default => rotated', animate('0.4s')),
    ]),
  ],
})
export class MainPageComponent implements OnInit {
  pokemons: any[] = [];
  cardTable: boolean = true;
  state: string = 'default';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cardTable = false;

    this.dataService.getPokemonsList().subscribe((response: any) => {
      response.results.sort().forEach((result) => {
        this.dataService.getPokemon(result.name).subscribe((response2: any) => {
          this.pokemons.push(response2);
          this.ordenar();
        });
      });
    });
    console.log(this.pokemons);
  }

  changeStyle() {
    this.cardTable = !this.cardTable;
  }
  rotate() {
    this.state = this.state === 'default' ? 'rotated' : 'default';
  }
  ordenar() {
    this.pokemons = this.pokemons.sort((pkm1, pkm2) => {
      return pkm1.id - pkm2.id;
    });
  }
}
