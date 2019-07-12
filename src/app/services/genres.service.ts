import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Genre } from '..//shared/types';
import baseUrl from '../shared/base-url';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private genres: Genre[];
  private genres$: Observable<Genre[]>;
  private url = `${baseUrl}/api/Genres`;

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    if (this.genres) {
      this.genres$ = of(this.genres);

    } else if (!this.genres$) {
      this.genres$ = this.http.get<Genre[]>(this.url)
        .pipe(
          tap(genres => this.genres = genres),
          shareReplay(1)
        );

    }
    return this.genres$;
  }

  putGenre(id: number, partialGenre: Partial<Genre>): void {
    this.getGenres().subscribe(() => {
      const index = this.genres.findIndex(g => g.genreId === id);
      Object.assign(this.genres[index], partialGenre);

      this.http.put(`${this.url}/${id}`, this.genres[index])
        .subscribe();
    });
  }

  deleteGenre(id: number): void {
    this.getGenres().subscribe(() => {
      const index = this.genres.findIndex(g => g.genreId === id);
      this.genres.splice(
        index,
        1
      );
    });
    this.http.delete(`${this.url}/${id}`)
      .subscribe();
  }

  postGenre(genre: Genre): void {
    this.http.post(this.url, genre).subscribe((g: Genre) => {
      this.getGenres().subscribe(() => {
        if (!this.genres.find(elm => elm.genreId === g.genreId)) {
          this.genres.unshift(g);
        }
      });
    });
  }
}
