import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Developer } from '../shared/types';
import baseUrl from '../shared/base-url';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {
  private developers$: Observable<Developer[]>;
  private developers: Developer[];
  private url = `${baseUrl}/api/Developers`;

  constructor(private http: HttpClient) { }

  getDevelopers(): Observable<Developer[]> {
    if (this.developers) {
      this.developers$ = of(this.developers);

    } else if (!this.developers$) {
      this.developers$ = this.http.get<Developer[]>(this.url)
        .pipe(
          tap(developers => this.developers = developers),
          shareReplay(1)
        );

    }
    return this.developers$;
  }

  getDeveloper(id: number): Observable<Developer> {
    return this.getDevelopers()
      .pipe(
        map(developers => developers.find(developer => developer.developerId === id))
      );
  }

  putDeveloper(id: number, partialDeveloper: Partial<Developer>): void {
    this.getDevelopers().subscribe(() => {
      const index = this.developers.findIndex(d => d.developerId === id);
      Object.assign(this.developers[index], partialDeveloper);

      this.http.put(`${this.url}/${id}`, this.developers[index])
        .subscribe();
    });
  }

  deleteDeveloper(id: number): void {
    this.getDevelopers().subscribe(() => {
      const index = this.developers.findIndex(d => d.developerId === id);
      this.developers.splice(
        index,
        1
      );
      this.http.delete(`${this.url}/${id}`)
        .subscribe();
    });
  }

  postDeveloper(developer: Developer): void {
    this.http.post(this.url, developer).subscribe((d: Developer) => {
        this.getDevelopers().subscribe(() => {
          if (!this.developers.find(elm => elm.developerId === d.developerId)) {
            this.developers.unshift(d);
          }
        });
      });
  }
}
