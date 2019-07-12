import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, map, tap } from 'rxjs/operators';

import { Game } from '../shared/types';
import baseUrl from '../shared/base-url';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private games$: Observable<Game[]>;
  private games: Game[];
  private url = `${baseUrl}/api/Games`;

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    if (this.games) {
      this.games$ = of(this.games);

    } else if (!this.games$) {
      this.games$ = this.http.get<Game[]>(this.url)
        .pipe(
          tap(games => this.games = games),
          shareReplay(1)
        );

    }
    return this.games$;
  }

  getGame(id: number): Observable<Game> {
    return this.getGames()
      .pipe(
        map(games => games.find(game => game.gameId === id))
      );
  }

  deleteGame(id: number): void {
    this.getGames().subscribe(() => {
      const index = this.games.findIndex(g => g.gameId === id);
      this.games.splice(
        index,
        1
      );
    });
    this.http.delete(`${this.url}/${id}`)
      .subscribe();
  }

  postGame(game: Game): void {
    this.http.post(this.url, game).subscribe((g: Game) => {
      this.getGames().subscribe(() => {
        if (!this.games.find(elm => elm.gameId === g.gameId)) {
          this.games.unshift(g);
        }
      });
    });
  }

  putGame(id: number, partialGame: Partial<Game>): void {
    this.getGames().subscribe(() => {
      const index = this.games.findIndex(g => g.gameId === id);
      Object.assign(this.games[index], partialGame);

      this.http.put(`${this.url}/${id}`, this.games[index])
        .subscribe();
    });
  }

}
