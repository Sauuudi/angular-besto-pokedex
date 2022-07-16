import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  pokemons: any[] = [];
  cardTable: boolean = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cardTable = true;

    this.dataService.getPokemonsList().subscribe((response: any) => {
      response.results.sort().forEach((result) => {
        this.dataService.getPokemon(result.name).subscribe((response2: any) => {
          this.pokemons.push(response2);
        });
      });
    });

    console.log(this.pokemons);
    //this.pokemons.sort((pkm1, pkm2) => pkm1.id - pkm2.id);
  }

  changeStyle() {
    this.cardTable = !this.cardTable;
  }
}
