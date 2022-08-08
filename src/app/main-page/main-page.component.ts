import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  currentPage: number = 1;
  numberOfPages: number = 1;
  pokemonsToShow: any[] = [];
  pokemonsInPage = 60;
  firstPoke = 0;
  lastPoke = 0;

  constructor(private dataService: DataService) {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (Object.keys(changes).includes('pokemons')) {
  //     this.pagination();
  //   }
  // }

  ngOnInit(): void {
    this.cardTable = false;

    this.dataService.getPokemonsList().subscribe(async (response: any) => {
      await response.results.sort().forEach((result) => {
        this.dataService.getPokemon(result.name).subscribe((response2: any) => {
          this.pokemons.push(response2);
          this.ordenar();
          this.pagination();
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

  setPokemonsToShow() {
    const first = (this.currentPage - 1) * this.pokemonsInPage;
    const last = this.currentPage * this.pokemonsInPage;
    this.firstPoke = first;
    if (last > this.pokemons.length) {
      this.lastPoke = this.pokemons.length;
    } else {
      this.lastPoke = last;
    }
    this.pokemonsToShow = this.pokemons.slice(first, last);
  }

  nextPage() {
    this.currentPage++;
    this.setPokemonsToShow();
    this.scrollTop();
  }
  previousPage() {
    this.currentPage--;
    this.setPokemonsToShow();
    this.scrollTop();
  }
  pagination() {
    if (this.pokemons) {
      this.numberOfPages = Math.ceil(
        this.pokemons.length / this.pokemonsInPage
      );
      this.setPokemonsToShow();
    }
  }
  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
