import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css'],
})
export class PokemonInfoComponent implements OnInit {
  pokemon: any;
  pokemonId: any;
  mainImageLink: String = '';

  evolutionChainInfo: any = [];
  evolutionImagesLinks: any = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.pokemonId = paramMap.get('id');
    });
    this.dataService.getPokemon(this.pokemonId).subscribe((response: any) => {
      this.pokemon = response;
    });

    this.http
      .get(`https://pokeapi.co/api/v2/pokemon-species/` + this.pokemonId)
      .subscribe((response: any) => {
        this.http
          .get(response.evolution_chain.url)
          .subscribe((response2: any) => {
            var evolutionData = response2.chain;

            do {
              var evolutionDetails = evolutionData['evolution_details'][0];

              this.evolutionChainInfo.push({
                species_name: evolutionData.species.name,
                min_level: !evolutionDetails ? 1 : evolutionDetails.min_level,
                trigger_name: !evolutionDetails
                  ? null
                  : evolutionDetails.trigger.name,
                item: !evolutionDetails ? null : evolutionDetails.item,
              });//aqui hacer qie saque mas de 3 pokemon en caso como gardevoir y gallade

              evolutionData = evolutionData['evolves_to'][0];
            } while (
              !!evolutionData &&
              evolutionData.hasOwnProperty('evolves_to') 
            );
             console.log(this.evolutionChainInfo);
             
              
            this.getImages();
            
          });
      });

    this.mainImageLink =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
      this.pokemonId +
      '.png';
  }

  getImages() {
    for (var i = 0; i < this.evolutionChainInfo.length; i++) {
      this.dataService
        .getPokemon(this.evolutionChainInfo[i].species_name)
        .subscribe((response: any) => {
          this.evolutionImagesLinks.push(
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
              response.id +
              '.png'
          );
          this.evolutionImagesLinks = this.evolutionImagesLinks.sort((img1, img2) => {
            
            if (img1 > img2) {
              return 1;
            } else if (img1 < img2) {
              return -1;
            }
            return 0;
          });

        });
    }
  }
}
