import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GamesService } from '../services/games.service';
import { Game } from '../shared/types';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: Game[];

  constructor(
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.gamesService.getGames()
      .subscribe(games => this.games = games);
  }

  editGameHandler(gameId: number) {
    this.router.navigate(['editing', gameId], { relativeTo: this.route });
  }

}
