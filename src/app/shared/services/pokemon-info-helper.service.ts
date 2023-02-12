import { Injectable } from '@angular/core';
import { LinealEvolutionChain } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonInfoHelperService {
  stagedEvolutionChain: any = [[], [], []];

  transformEvolutionChain(chain: any[], currentStage = 0) {
    let linealEvolutionChain: LinealEvolutionChain;

    if (chain != null && chain[0].evolves_to.length > 0) {
      const nextEvolutions = [];
      chain[0].evolves_to.forEach((evolution) =>
        nextEvolutions.push(
          this.transformEvolutionChain([evolution], currentStage + 1)
            .linealEvolutionChain
        )
      );
      linealEvolutionChain = {
        pokemon: {
          name: chain[0].species.name,
          id: chain[0].species.url.slice(42, -1),
          evolutionDetails: this.getEvolutionDetails(chain[0].evolution_details),
        },
        nextEvolutions: nextEvolutions,
      };
    } else {
      linealEvolutionChain = {
        pokemon: {
          name: chain[0].species.name,
          id: chain[0].species.url.slice(42, -1),
          evolutionDetails: this.getEvolutionDetails(chain[0].evolution_details),
        },
        nextEvolutions: 'LastEvolution',
      };
    }
    this.stagedEvolutionChain[currentStage].push(linealEvolutionChain.pokemon);
    return {
      linealEvolutionChain,
      stagedEvolutionChain: this.stagedEvolutionChain,
    };
  }

  getEvolutionDetails(rawEvolutionDetails) {
    if(rawEvolutionDetails == null) {
      return [];
    }

    const evolutionDetailsToReturn: string[] = [];
    rawEvolutionDetails.forEach(evolutionDetails => {
      let text = ''
      switch(evolutionDetails.trigger.name) {
        case 'level-up':
            text = 'Level Up';
            if (evolutionDetails.min_level !== null) {
              text += evolutionDetails.min_level;
            } 
            if (evolutionDetails.gender !== null) {
              evolutionDetails.gender === 2 ? text += ' (Male)' : text += ' (Female)';
            }
            if (evolutionDetails.held_item !== null) {
              text += ' holding ' + evolutionDetails.held_item.name;
            }
            if (evolutionDetails.known_move !== null) {
              text += ' knowing ' + evolutionDetails.known_move.name;
            }
            if (evolutionDetails.known_move_type !== null) {
              text += ' knowing a ' + evolutionDetails.known_move_type.name + ' move';
            }
            if (evolutionDetails.min_affection !== null) {
              text += ' with ' + evolutionDetails.min_affection + '+ Affection';
            }
            if (evolutionDetails.min_beauty !== null) {
              text += ' with ' + evolutionDetails.min_beauty + '+ Beauty';
            }
            if (evolutionDetails.min_happiness !== null) {
              text += ' with ' + evolutionDetails.min_happiness + '+ Happiness';
            }
            if (evolutionDetails.relative_physical_stats !== null) {
              let sign;
              if (evolutionDetails.relative_physical_stats === 1) {
                sign = '>';
              } else if (evolutionDetails.relative_physical_stats === -1) {
                sign = '<';
              } else {
                sign = '=';
              }
              text += ' with ATACK ' + sign + ' DEF';
            }
            if (evolutionDetails.party_species !== null) {
              text += ' with ' + evolutionDetails.party_species.name + ' in party';
            }
            if (evolutionDetails.party_type !== null) {
              text += ' with a ' + evolutionDetails.party_type.name + ' pokemon type in party';
            }
            if (evolutionDetails.location !== null) {
              switch (evolutionDetails.location.name){
                case 'mt-coronet':
                  text += ' in a Special magnetic field or Use Thunder Stone or';
                  break;
                case 'sinnoh-route-21':
                  text += ' in an Ice Rock or Use Ice Stone or';
                  break;
                case 'eterna-forest':
                  text += ' in a Moss Rock or Use Leaf Stone or';
                  break;
                case 'mount-lanakila':
                  text += ' in Lanakila Mountain or';
                  break;
              }
            text += ' in any other special location/rock type';
            }
            if (evolutionDetails.needs_overworld_rain !== false) {
              text += ' during Rain ';
            }
            if (evolutionDetails.time_of_day !== '') {
              text += ' at ' + evolutionDetails.time_of_day;
            }
            if (evolutionDetails.turn_upside_down !== false) {
              text += ' holding 3DS upside-down';
            }
            break;
        case 'trade':
          text = 'Trade';
          if (evolutionDetails.held_item !== null) {
            text += ' holding ' + evolutionDetails.held_item.name;
          }
          if (evolutionDetails.trade_species !== null) {
            text += ' with ' + evolutionDetails.trade_species.name;
          }
          if (evolutionDetails.gender !== null) {
            evolutionDetails.gender === 2 ? text += ' with (Male) pokemon ' : text += 'with (Female) pokemon ';
          }
          break;
        case 'use-item':
          text = 'Use ';
          if (evolutionDetails.item !== null) {
            text += evolutionDetails.item.name;
          }
          if (evolutionDetails.gender !== null) {
            evolutionDetails.gender === 2 ? text += ' with (Male) pokemon ' : text += 'with (Female) pokemon ';
          }
          break;
        case 'shed':
          text = 'Level 20, with empty PokéBall and an open slot in party';
          break;
      }
      evolutionDetailsToReturn.push(text);
    });

    return evolutionDetailsToReturn;
  }
}