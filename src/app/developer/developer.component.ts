import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game, Developer } from '../shared/types';
import { DevelopersService } from '../services/developers.service';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {
  developer: Developer;
  games: Game[];

  constructor(
    private route: ActivatedRoute,
    private developersService: DevelopersService,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = parseInt(paramMap.get('id'), 10);

      this.developersService.getDeveloper(id)
        .subscribe(developer => {
          this.developer = developer;

          if (!developer.game.length) {
            this.gamesService.getGames()
              .subscribe(games => {
                this.games = games.filter(game => game.developerId === developer.developerId);
              });
          } else {
            this.games = developer.game;
          }
        });
    });
  }

}
