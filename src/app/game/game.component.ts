import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game, Developer, Publisher } from '../shared/types';
import { DevelopersService } from '../services/developers.service';
import { GamesService } from '../services/games.service';
import { PublishersService } from '../services/publishers.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  developer: Developer;
  publisher?: Publisher;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private developersService: DevelopersService,
    private gamesService: GamesService,
    private publishersService: PublishersService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = parseInt(paramMap.get('id'), 10);

      this.gamesService.getGame(id)
        .subscribe(game => {
          this.game = game;

          if (game.developer) {
            this.developer = game.developer;
          } else {
            this.developersService.getDeveloper(game.developerId)
              .subscribe(developer => this.developer = developer);
          }
          if (game.publisher) {
            this.publisher = game.publisher;
          } else if (game.publisherId) {
            this.publishersService.getPublisher(game.publisherId)
              .subscribe(publisher => this.publisher = publisher);
          }
        });
    });
  }

  back() {
    this.location.back();
  }

}
