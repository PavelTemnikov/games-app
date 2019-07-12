import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { GameManagerComponent } from './shared/game-manager/game-manager.component';
import { DevelopersComponent } from './developers/developers.component';
import { DeveloperComponent } from './developer/developer.component';
import { PublishersComponent } from './publishers/publishers.component';
import { PublisherComponent } from './publisher/publisher.component';
import { GenresComponent } from './genres/genres.component';

const routes: Routes = [
  { path: 'games', component: GamesComponent },
  { path: 'games/creating', component: GameManagerComponent },
  { path: 'games/:id', component: GameComponent },
  { path: 'games/editing/:id', component: GameManagerComponent },
  { path: 'developers', component: DevelopersComponent },
  { path: 'developers/:id', component: DeveloperComponent },
  { path: 'publishers', component: PublishersComponent },
  { path: 'publishers/:id', component: PublisherComponent },
  { path: 'genres', component: GenresComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
