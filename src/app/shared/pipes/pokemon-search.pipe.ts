import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonSearch'
})
export class PokemonSearchPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
