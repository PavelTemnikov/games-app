import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DevelopersService } from '../../services/developers.service';
import { PublishersService } from '../../services/publishers.service';
import { GenresService } from '../../services/genres.service';
import { GamesService } from '../../services/games.service';
import { Developer, Publisher, Genre, Game } from '../types';

@Component({
  selector: 'app-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss']
})
export class GameManagerComponent implements OnInit {
  gameForm: FormGroup;
  developers: Developer[];
  publishers: Publisher[];
  genres: Genre[];
  canShowFrom = false;
  submitButtonName = 'Create Game';
  game: Game;

  constructor(
    private fb: FormBuilder,
    private developersService: DevelopersService,
    private publishersService: PublishersService,
    private genresService: GenresService,
    private gamesService: GamesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      description: ['', Validators.required],
      developerId: [null, Validators.required],
      publisherId: [null],
      genreIds: [null]
    });

    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (!id) {
        this.canShowFrom = true;
        return;
      }
      this.gamesService.getGame(parseInt(id, 10)).subscribe(game => {
        this.game = game;
        this.gameForm.setValue({
          name: game.name,
          description: game.description,
          developerId: game.developerId,
          publisherId: game.publisherId || null,
          genreIds: game.gameXrefGenre ? game.gameXrefGenre.map(xref => xref.genreId) : null
        });
        this.submitButtonName = 'Update Game';
        this.canShowFrom = true;
      });
    });

    this.developersService.getDevelopers()
      .subscribe(developers => this.developers = developers);

    this.publishersService.getPublishers()
      .subscribe(publishers => this.publishers = publishers);

    this.genresService.getGenres()
      .subscribe(genres => this.genres = genres);
  }

  submit() {
    let genreIds: number[];
    const genresValue: number[] | number | null = this.gameForm.get('genreIds').value;
    if (!genresValue) {
      genreIds = [];
    } else if (typeof genresValue === 'number') {
      genreIds = [genresValue];
    } else {
      genreIds = genresValue;
    }

    const gameId = this.game ? this.game.gameId : 0;
    const newGame: Game = {
      gameId,
      name: this.gameForm.get('name').value,
      description: this.gameForm.get('description').value,
      developerId: this.gameForm.get('developerId').value,
      publisherId: this.gameForm.get('publisherId').value,
      gameXrefGenre: genreIds.map(id => ({ gameId, genreId: id }))
    };
    this.game ? this.gamesService.putGame(gameId, newGame) :
      this.gamesService.postGame(newGame);

    this.router.navigate(['/games']);
  }

}
