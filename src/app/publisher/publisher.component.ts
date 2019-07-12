import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game, Publisher } from '../shared/types';
import { GamesService } from '../services/games.service';
import { PublishersService } from '../services/publishers.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {
  publisher: Publisher;
  games: Game[];

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private publishersService: PublishersService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = parseInt(paramMap.get('id'), 10);

      this.publishersService.getPublisher(id)
        .subscribe(publisher => {
          this.publisher = publisher;

          if (!publisher.game.length) {
            this.gamesService.getGames()
              .subscribe(games => {
                this.games = games.filter(game => game.publisherId === publisher.publisherId);
              });
          } else {
            this.games = publisher.game;
          }
        });
    });
  }

}
