import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Pokemon } from '../shared/models/pokemon.model';
import { SearchHelperService } from '../shared/services/search-helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  pokemonsToShow: Pokemon[];
  pokemonCount: number;
  pokemonLimitPerPage = 60;

  cardTable: boolean = false;

  searchSuscription: Subscription;

  constructor(
    private dataService: DataService,
    private searchHelper: SearchHelperService
  ) {}

  async ngOnInit() {
    console.log(
      'recordatorio: set table header wirth u otra forma, mejorar header y search, hide search en pag que no sean main, ordenar pokemon, reminder de los dos estilos, cambair paginacion, add mas cosas a pokemon species o si no quitar'
    );
    // en el futuro guardar los pokemon en local y si ya estan cargados los pillamos asi
    await this.dataService.getPokemonList(50).then((pokemonList: Pokemon[]) => {
      this.pokemonsToShow = pokemonList;
      this.pokemonCount = pokemonList.length;
      console.log(this.pokemonsToShow.length, this.pokemonCount, pokemonList.length);
      this.sortPokemonList();
    });

    this.searchSuscription = this.searchHelper
      .getSearchValues()
      .subscribe((searchValues) => {
        this.pokemonsToShow = this.filterPokemon(searchValues);
      });
  }

  ngOnDestroy() {
    if (this.searchSuscription) {
      this.searchSuscription.unsubscribe();
    }
  }

  changeTemplate() {
    this.cardTable = !this.cardTable;
  }

  private filterPokemon(search: string) {
    return this.pokemonsToShow.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  private sortPokemonList() {
    this.pokemonsToShow.sort((pokemon1, pokemon2) => {
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
