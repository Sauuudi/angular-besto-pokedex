import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
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

  evolutionChainExceptions_112 = ['oddish', 'poliwag', 'ralts', 'cosmog'];
  evolutionChainExceptions_12 = [
    'slowpoke',
    'nincada',
    'snorunt',
    'clamperl',
    'burmy',
  ];
  evolutionChainExceptions_122 = ['wurmple'];
  evolutionChainExceptions_13 = ['tyrogue'];
  evolutionChainExceptions_18 = ['eevee'];

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
            var chain = response2.chain;

            this.getEvolutionChain(chain);

            this.getImages();

            console.log(this.evolutionChainInfo);
            console.log(this.evolutionImagesLinks);
            
          });
      });

    this.mainImageLink =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
      this.pokemonId +
      '.png';
  }

  getEvolutionChain(chain) {
    var exceptionalChainType = '';

    if (
      this.evolutionChainExceptions_112.indexOf(chain['species']['name']) > -1
    ) {
      exceptionalChainType = '112';
    } else if (
      this.evolutionChainExceptions_12.indexOf(chain['species']['name']) > -1
    ) {
      exceptionalChainType = '12';
    } else if (
      this.evolutionChainExceptions_13.indexOf(chain['species']['name']) > -1
    ) {
      exceptionalChainType = '13';
    } else if (
      this.evolutionChainExceptions_18.indexOf(chain['species']['name']) > -1
    ) {
      exceptionalChainType = '18';
    } else if (
      this.evolutionChainExceptions_122.indexOf(chain['species']['name']) > -1
    ) {
      exceptionalChainType = '122';
    }
    var nextChain, i;
    switch (exceptionalChainType) {
      case '': // Normal Case
        do {
          this.evolutionChainInfo.push([
            chain['species']['name'],
            chain['is_baby'],
            chain['evolution_details'],
          ]);
          chain = chain['evolves_to'][0];
        } while (chain !== undefined);
        break;
      case '112':
        nextChain = chain;
        this.evolutionChainInfo.push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          nextChain['evolution_details'],
        ]);
        nextChain = chain['evolves_to'][0];
        this.evolutionChainInfo.push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          nextChain['evolution_details'],
        ]);
        this.evolutionChainInfo[2] = [];
        i = 0;
        while (chain['evolves_to'][0]['evolves_to'][i] !== undefined) {
          nextChain = chain['evolves_to'][0]['evolves_to'][i];
          this.evolutionChainInfo[2].push([
            nextChain['species']['name'],

            nextChain['is_baby'],
            nextChain['evolution_details'],
          ]);
          i++;
        }
        break;
      case '12':
      case '13':
      case '18':
        nextChain = chain;
        this.evolutionChainInfo.push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          nextChain['evolution_details'],
        ]);
        this.evolutionChainInfo[1] = [];
        i = 0;
        while (chain['evolves_to'][i] !== undefined) {
          nextChain = chain['evolves_to'][i];
          this.evolutionChainInfo[1].push([
            nextChain['species']['name'],

            nextChain['is_baby'],
            nextChain['evolution_details'],
          ]);
          i++;
        }
        break;
      case '122':
        nextChain = chain;
        this.evolutionChainInfo.push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          nextChain['evolution_details'],
        ]);
        this.evolutionChainInfo[1] = [];
        nextChain = chain['evolves_to'][0]; // silcoon
        this.evolutionChainInfo[1].push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          nextChain['evolution_details'],
        ]);
        nextChain = chain['evolves_to'][1]; // cascoon
        this.evolutionChainInfo[1].push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          nextChain['evolution_details'],
        ]);
        this.evolutionChainInfo[2] = [];
        nextChain = chain['evolves_to'][0]['evolves_to'][0]; // Beautifly
        this.evolutionChainInfo[2].push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          nextChain['evolution_details'],
        ]);
        nextChain = chain['evolves_to'][1]['evolves_to'][0]; // Dustox
        this.evolutionChainInfo[2].push([
          nextChain['species']['name'],
          nextChain['is_baby'],
          nextChain['evolution_details'],
        ]);
    }
  }

  getImages() {
    for (var i = 0; i < this.evolutionChainInfo.length; i++) {
      this.dataService
        .getPokemon(this.evolutionChainInfo[i][0])
        .subscribe((response: any) => {
          this.evolutionImagesLinks.push(
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
              response.id +
              '.png'
          );
          this.evolutionImagesLinks = this.evolutionImagesLinks.sort(
            (img1, img2) => {
              if (img1 > img2) {
                return 1;
              } else if (img1 < img2) {
                return -1;
              }
              return 0;
            }
          );
        });
    }
  }
}
