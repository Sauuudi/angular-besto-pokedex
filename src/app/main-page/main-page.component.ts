import { Component, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Pokemon } from '../shared/models/pokemon.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemonCount: number;

  iterableDiffer:IterableDiffer<Pokemon>;

  pokemonsToShow: Pokemon[];
  pokemonLimitPerPage = 60;

  cardTable: boolean;

  constructor(
    private dataService: DataService,
    private iterableDiffers: IterableDiffers
  ) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngOnInit(){
    console.log('recordatorio: set table header wirth u otra forma, mejorar header, hacer reminder de los dos estilos, search, cambair paginacion, cambiar iconos de tipos a compoenente u otras imageenes');
    this.cardTable = false;
    this.pokemonCount = this.dataService.pokemonLimit;
    
    // en el futuro quiero guardar los pokemon en local y si ya estan cargados los pillamos asi
    // if(this.dataService.pokemonList.length) {
      //this.pokemonList = this.dataService.pokemonList;
    // }
    //else {
      // de momento dejamos solo la suscripcion 
      this.dataService.getPokemonList(50).subscribe( pokemonList => {
        this.pokemonList = pokemonList;
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

  changeTemplate() {
    this.cardTable = !this.cardTable;
  }

  sortPokemonList() {
    this.pokemonList = this.pokemonList.sort((pokemon1, pokemon2) => {
      return pokemon1.id - pokemon2.id;
    });
  } 
}

// // change pagination logic xdd
// currentPage: number = 1;
// numberOfPages: number = 1;
// firstPoke = 0;
// lastPoke = 0;

// loadPokemonsToShow() {
//   const first = (this.currentPage - 1) * this.pokemonLimitPerPage;
//   const last = this.currentPage * this.pokemonLimitPerPage;
//   this.firstPoke = first;
//   if (last > this.pokemonCount) {
//     this.lastPoke = this.pokemonCount;
//   } else {
//     this.lastPoke = last;
//   }
//   this.pokemonsToShow = this.pokemonList.slice(first, last);
// }
// nextPage() {
//   this.currentPage++;
//   this.loadPokemonsToShow();
//   this.scrollTop();
// }
// previousPage() {
//   this.currentPage--;
//   this.loadPokemonsToShow();
//   this.scrollTop();
// }
// pagination() {
//   if (this.pokemonList) {
//     this.numberOfPages = Math.ceil(
//       this.pokemonCount / this.pokemonLimitPerPage
//     );
//     this.loadPokemonsToShow();
//   }
// }
// scrollTop() {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth'
//   })
// }