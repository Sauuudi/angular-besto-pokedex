import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss'],
})
export class PokemonInfoComponent implements OnInit {
  pokemon: any;
  pokemonId: any;
  mainImageLink: String = '';

  evolutionChainInfo: any = [];
  evolutionImagesLinks: any = [];
  exceptionalChainType;

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
    // unsuscribe on destroy
    const getPokemonSubscription = this.dataService
      .getPokemon(this.pokemonId)
      .subscribe((response: any) => {
        this.pokemon = response;
        console.log(this.pokemon.abilities);
        
      });

    this.dataService
      .getPokemonSpecies(this.pokemonId)
      .subscribe((pokeSpecie: any) => {
        this.dataService
          .getEvolutionChain(pokeSpecie.evolution_chain.url)
          .subscribe((evo_chain: any) => {
            var chain = evo_chain.chain;

            this.getEvolutionChain(chain);
          });
      });

    //this.mainImageLink = 'assets/pokemon_images_compressed/' + this.pokemonId+ '.png';
    this.mainImageLink =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
      this.pokemonId +
      '.png';
  }

  getEvolutionChain(chain) {
    this.exceptionalChainType = '';

    if (
      this.evolutionChainExceptions_112.indexOf(chain['species']['name']) > -1
    ) {
      this.exceptionalChainType = '112';
    } else if (
      this.evolutionChainExceptions_12.indexOf(chain['species']['name']) > -1
    ) {
      this.exceptionalChainType = '12';
    } else if (
      this.evolutionChainExceptions_13.indexOf(chain['species']['name']) > -1
    ) {
      this.exceptionalChainType = '13';
    } else if (
      this.evolutionChainExceptions_18.indexOf(chain['species']['name']) > -1
    ) {
      this.exceptionalChainType = '18';
    } else if (
      this.evolutionChainExceptions_122.indexOf(chain['species']['name']) > -1
    ) {
      this.exceptionalChainType = '122';
    }
    var nextChain, i;
    switch (this.exceptionalChainType) {
      case '': // Normal Case
        do {
          this.evolutionChainInfo.push([
            chain['species']['name'],
            chain['is_baby'],
            this.getEvolutionDetails(chain['evolution_details']),
            chain['species']['url'].slice(42, -1),
          ]);
          chain = chain['evolves_to'][0];
        } while (chain !== undefined);
        break;
      case '112':
        nextChain = chain;
        this.evolutionChainInfo.push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          this.getEvolutionDetails(nextChain['evolution_details']),
          nextChain['species']['url'].slice(42, -1),
        ]);
        nextChain = chain['evolves_to'][0];
        this.evolutionChainInfo.push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          this.getEvolutionDetails(nextChain['evolution_details']),
          nextChain['species']['url'].slice(42, -1),
        ]);
        this.evolutionChainInfo[2] = [];
        i = 0;
        while (chain['evolves_to'][0]['evolves_to'][i] !== undefined) {
          nextChain = chain['evolves_to'][0]['evolves_to'][i];

          this.evolutionChainInfo[2].push([
            nextChain['species']['name'],

            nextChain['is_baby'],
            this.getEvolutionDetails(nextChain['evolution_details']),
            nextChain['species']['url'].slice(42, -1),
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
          this.getEvolutionDetails(nextChain['evolution_details']),
          nextChain['species']['url'].slice(42, -1),
        ]);
        this.evolutionChainInfo[1] = [];
        i = 0;
        while (chain['evolves_to'][i] !== undefined) {
          nextChain = chain['evolves_to'][i];
          this.evolutionChainInfo[1].push([
            nextChain['species']['name'],

            nextChain['is_baby'],
            this.getEvolutionDetails(nextChain['evolution_details']),
            nextChain['species']['url'].slice(42, -1),
          ]);
          i++;
        }
        break;
      case '122':
        nextChain = chain;
        this.evolutionChainInfo.push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          this.getEvolutionDetails(nextChain['evolution_details']),
          nextChain['species']['url'].slice(42, -1),
        ]);
        this.evolutionChainInfo[1] = [];
        nextChain = chain['evolves_to'][0]; // silcoon
        this.evolutionChainInfo[1].push([
          nextChain['species']['name'],

          nextChain['is_baby'],
          this.getEvolutionDetails(nextChain['evolution_details']),
          nextChain['species']['url'].slice(42, -1),
        ]);
        nextChain = chain['evolves_to'][1]; // cascoon
        this.evolutionChainInfo[1].push([
          nextChain['species']['name'],
          nextChain['is_baby'],
          this.getEvolutionDetails(nextChain['evolution_details']),
          nextChain['species']['url'].slice(42, -1),
        ]);
        this.evolutionChainInfo[2] = [];
        nextChain = chain['evolves_to'][0]['evolves_to'][0]; // Beautifly
        this.evolutionChainInfo[2].push([
          nextChain['species']['name'],
          nextChain['is_baby'],
          this.getEvolutionDetails(nextChain['evolution_details']),
          nextChain['species']['url'].slice(42, -1),
        ]);
        nextChain = chain['evolves_to'][1]['evolves_to'][0]; // Dustox
        this.evolutionChainInfo[2].push([
          nextChain['species']['name'],
          nextChain['is_baby'],
          this.getEvolutionDetails(nextChain['evolution_details']),
          nextChain['species']['url'].slice(42, -1),
        ]);
    }
  }

  getImage(id: any) {
    return 'assets/pokemon_images_compressed/' + id + '.png';
    // 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
    // id +
    // '.png'
  }

  getEvolutionDetails(data: any): string {
    var res = '';

    if (data[0] == null) {
    } else {
      switch (data[0]['trigger'].name) {
        case 'level-up':
          {
            if (data[0]['min_level'] !== null) {
              res = 'Level Up ' + data[0]['min_level'] + '+';
            } else {
              res = 'Level Up';
            }
            if (data[0]['gender'] !== null) {
              let gender;
              if (data[0]['gender'] === 2) {
                gender = '(Male)';
              } else {
                gender = '(Female)';
              }
              res = res + ' ' + gender;
            }
            if (data[0]['held_item'] !== null) {
              res = res + ' holding ' + data[0]['held_item'].name;
            }
            if (data[0]['known_move'] !== null) {
              res = res + ' knowing ' + data[0]['known_move'].name;
            }
            if (data[0]['known_move_type'] !== null) {
              res =
                res + ' knowing a ' + data[0]['known_move_type'].name + ' move';
            }
            if (data[0]['min_affection'] !== null) {
              res = res + ' with ' + data[0]['min_affection'] + '+ Affection';
            }
            if (data[0]['min_beauty'] !== null) {
              res = res + ' with ' + data[0]['min_beauty'] + '+ Beauty';
            }
            if (data[0]['min_happiness'] !== null) {
              res = res + ' with ' + data[0]['min_happiness'] + '+ Happiness';
            }
            if (data[0]['relative_physical_stats'] !== null) {
              let sign;
              if (data[0]['relative_physical_stats'] === 1) {
                sign = '>';
              } else if (data[0]['relative_physical_stats'] === -1) {
                sign = '<';
              } else {
                sign = '=';
              }
              res = res + ' with ATCK ' + sign + ' DEF';
            }
            if (data[0]['party_species'] !== null) {
              res =
                res + ' with ' + data[0]['party_species'].name + ' in party';
            }
            if (data[0]['party_type'] !== null) {
              res =
                res +
                ' with a ' +
                data[0]['party_type'].name +
                ' type in party';
            }
            if (data[0]['location'] !== null) {
              var location = data[0]['location'].name;
              if (location == 'mt-coronet') {
                res =
                  res + ' in a Special magnetic field or Use Thunder Stone ';
              } else if (location == 'sinnoh-route-217') {
                res = res + ' in Ice Rock or Use Ice Stone ';
              } else if (location == 'eterna-forest') {
                res = res + ' in Moss Rock or Use Leaf Stone';
              } else if (location == 'mount-lanakila') {
                res = res + ' in a Lanakila Mountain ';
              }
            }
          }
          if (data[0]['needs_overworld_rain'] !== false) {
            res = res + ' during Rain';
          }
          if (data[0]['time_of_day'] !== '') {
            res = res + ' at ' + data[0]['time_of_day'];
          }
          if (data[0]['turn_upside_down'] !== false) {
            res = res + ' holding 3DS upside-down';
          }
          if (this.pokemonId == 737 && data[1] != null) {
            res = res + ' in a Special Magnetic Field or Use Thunder Stone';
          }
          break;

        case 'trade':
          res = 'Trade';
          if (data[0]['held_item'] !== null) {
            res = res + ' holding ' + data[0]['held_item'].name;
          }
          if (data[0]['trade_species'] !== null) {
            res = res + ' with ' + data[0]['trade_species'].name;
          }
          if (data[0]['gender'] !== null) {
            let gender;
            if (data[0]['gender'] === 2) {
              gender = '(Male)';
            } else {
              gender = '(Female)';
            }
            res = res + ' ' + gender;
          }
          break;
        case 'use-item':
          res = 'Use';
          if (data[0]['item'] !== null) {
            res = res + ' ' + data[0]['item'].name;
          }
          if (data[0]['gender'] !== null) {
            let gender;
            if (data[0]['gender'] === 2) {
              gender = '(Male)';
            } else {
              gender = '(Female)';
            }
            res = res + ' ' + gender;
          }
          break;
        case 'shed':
          res = 'Level 20, with empty PokéBall and an open slot in party';
          break;
      }
    }
    console.log(res);

    return res;
  }

  setPokemonBackColor(filter: string): any {
    var filterr = TypeColorFilter[filter] ?? 'white';

    const style = {
      filter: filterr,
    };
    return style;
  }
}

export enum TypeColorFilter {
  normal = 'invert(100%) sepia(1%) saturate(786%) hue-rotate(1deg) brightness(90%) contrast(78%)',
  fire = 'invert(34%) sepia(24%) saturate(4646%) hue-rotate(348deg) brightness(97%) contrast(91%)',
  water = 'invert(44%) sepia(100%) saturate(1892%) hue-rotate(204deg) brightness(97%) contrast(97%)',
  electric = 'invert(85%) sepia(78%) saturate(3698%) hue-rotate(325deg) brightness(104%) contrast(98%)',
  grass = 'invert(67%) sepia(96%) saturate(1353%) hue-rotate(64deg) brightness(93%) contrast(84%)',
  ice = 'invert(79%) sepia(72%) saturate(239%) hue-rotate(115deg) brightness(104%) contrast(96%)',
  fighting = 'invert(37%) sepia(44%) saturate(727%) hue-rotate(339deg) brightness(97%) contrast(92%)',
  poison = 'invert(36%) sepia(12%) saturate(3294%) hue-rotate(252deg) brightness(99%) contrast(87%)',
  ground = 'invert(89%) sepia(10%) saturate(3119%) hue-rotate(339deg) brightness(92%) contrast(85%)',
  flying = 'invert(64%) sepia(76%) saturate(1216%) hue-rotate(198deg) brightness(105%) contrast(102%)',
  psychic = 'invert(64%) sepia(18%) saturate(4761%) hue-rotate(303deg) brightness(102%) contrast(96%)',
  bug = 'invert(80%) sepia(81%) saturate(372%) hue-rotate(11deg) brightness(90%) contrast(90%)',
  rock = 'invert(58%) sepia(71%) saturate(252%) hue-rotate(5deg) brightness(89%) contrast(82%)',
  ghost = 'invert(26%) sepia(71%) saturate(728%) hue-rotate(236deg) brightness(93%) contrast(85%)',
  dragon = 'invert(77%) sepia(45%) saturate(7233%) hue-rotate(219deg) brightness(94%) contrast(110%)',
  dark = 'invert(29%) sepia(11%) saturate(583%) hue-rotate(342deg) brightness(91%) contrast(92%)',
  steel = 'invert(45%) sepia(5%) saturate(81%) hue-rotate(202deg) brightness(94%) contrast(86%)',
  fairy = 'invert(80%) sepia(14%) saturate(991%) hue-rotate(291deg) brightness(99%) contrast(106%)',
}
