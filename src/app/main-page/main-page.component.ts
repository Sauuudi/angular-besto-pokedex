    import { Component, OnInit } from '@angular/core';
  import { DataService } from '../services/data.service';

  @Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
  })
  export class MainPageComponent implements OnInit {
    pokemonList: any[] = []; //nno es necesario pero por teenrlo
    pokemons : any[] = [];

    constructor(
      private dataService: DataService
    ) { }


    ngOnInit(): void {
      this.dataService.getPokemonsList()
        .subscribe((response: any) => {
          response.results.forEach(result => {
            this.pokemonList.push(result.name)//nno es necesario pero por teenrlo
            this.dataService.getPokemon(result.name)
            .subscribe((response2 : any) => {
              this.pokemons.push(response2)
            })
        }); 
        });
        console.log(this.pokemonList);
        console.log(this.pokemons);
      }
  }
