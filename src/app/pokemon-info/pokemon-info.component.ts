import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pokemon, TypeColorFilter } from '../shared/models/pokemon.model';
import { Subscription } from 'rxjs';
import { PokemonInfoHelperService } from '../shared/services/pokemon-info-helper.service';
@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss'],
})
export class PokemonInfoComponent implements OnInit, OnDestroy {
  pokemon: Pokemon;
  mainImagePath = '';

  pokemonSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    public pokemonInfoHelper: PokemonInfoHelperService
  ) {}

  ngOnInit() {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    this.loadData(pokemonId);
  }

  loadData(id) {
    this.pokemonSubscription = this.dataService.getPokemon(id, 'extended').subscribe((pokemon: Pokemon) => {
      console.log(pokemon);
      this.pokemon = pokemon;
      this.mainImagePath = this.pokemonInfoHelper.getImagePath(pokemon.id);
    });
  }

  ngOnDestroy() {
    if (this.pokemonSubscription) {
      this.pokemonSubscription.unsubscribe();
    }
  }

  onEvolution(id) {
    // esto esta mal corregir
    if(this.pokemonSubscription) {
      this.pokemonSubscription.unsubscribe();
    }
    this.loadData(id);
    window.scrollTo(0, 0)
  }

  setPokemonBackColor(filter: string) {
    const colorFilter = TypeColorFilter[filter] ?? 'white';
    const style = {
      filter: colorFilter,
    };
    return style;
  }
}
