import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';

const routes: Routes = [
  {
    path: 'home',
    title: 'Besto Pokedex',
    component: MainPageComponent,
  },
  {
    path: 'home/pokemon/:id',
    component: PokemonInfoComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

