import { AfterViewInit, Component, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Pokemon } from '../shared/models/pokemon.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
// change to css animation
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0 )' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('rotated => default', animate('0.4s')),
      transition('default => rotated', animate('0.4s')),
    ]),
  ],
})
export class MainPageComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemonCount;

  iterableDiffer:IterableDiffer<Pokemon>;

  pokemonsToShow: Pokemon[];
  pokemonLimitPerPage = 60;


  cardTable: boolean;
  state: string = 'default';
  currentPage: number = 1;
  numberOfPages: number = 1;
  firstPoke = 0;
  lastPoke = 0;

  constructor(
    private dataService: DataService,
    private iterableDiffers: IterableDiffers
  ) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngOnInit(){
    this.cardTable = true;
    this.pokemonCount = this.dataService.pokemonLimit;
    
    // en el futuro quiero guardar los pokemon en local y si ya estan cargados los pillamos asi
    // if(this.dataService.pokemonList.length) {
      //this.pokemonList = this.dataService.pokemonList;
    // }
    //else {
      // de momento dejamos solo la suscripcion 
      this.dataService.getPokemonList(50).subscribe( pokemonList => {
        this.pokemonList = pokemonList;
        console.log(this.pokemonList)
      });
    // }
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.pokemonList);
    if (changes) {
      console.log('pokemon list changed');
      this.sortPokemonList()
    }
}


  private searchPokemon() {
    
  }

  changeStyle() {
    this.cardTable = !this.cardTable;
  }
  rotate() {
    this.state = this.state === 'default' ? 'rotated' : 'default';
  }

  sortPokemonList() {
    this.pokemonList = this.pokemonList.sort((pokemon1, pokemon2) => {
      return pokemon1.id - pokemon2.id;
    });
  }

  loadPokemonsToShow() {
    const first = (this.currentPage - 1) * this.pokemonLimitPerPage;
    const last = this.currentPage * this.pokemonLimitPerPage;
    this.firstPoke = first;
    if (last > this.pokemonCount) {
      this.lastPoke = this.pokemonCount;
    } else {
      this.lastPoke = last;
    }
    this.pokemonsToShow = this.pokemonList.slice(first, last);
  }

  nextPage() {
    this.currentPage++;
    this.loadPokemonsToShow();
    this.scrollTop();
  }
  previousPage() {
    this.currentPage--;
    this.loadPokemonsToShow();
    this.scrollTop();
  }
  pagination() {
    if (this.pokemonList) {
      this.numberOfPages = Math.ceil(
        this.pokemonCount / this.pokemonLimitPerPage
      );
      this.loadPokemonsToShow();
    }
  }
  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

}
