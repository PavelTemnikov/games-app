import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Publisher } from '../shared/types';
import baseUrl from '../shared/base-url';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private publishers$: Observable<Publisher[]>;
  private publishers: Publisher[];
  private url = `${baseUrl}/api/Publishers`;

  constructor(private http: HttpClient) { }

  getPublishers(): Observable<Publisher[]> {
    if (this.publishers) {
      this.publishers$ = of(this.publishers);

    } else if (!this.publishers$) {
      this.publishers$ = this.http.get<Publisher[]>(this.url)
        .pipe(
          tap(publishers => this.publishers = publishers),
          shareReplay(1)
        );

    }
    return this.publishers$;
  }

  getPublisher(id: number): Observable<Publisher> {
    return this.getPublishers()
      .pipe(
        map(publishers => publishers.find(publisher => publisher.publisherId === id))
      );
  }

  putPublisher(id: number, partialPublisher: Partial<Publisher>): void {
    this.getPublishers().subscribe(() => {
      const index = this.publishers.findIndex(p => p.publisherId === id);
      Object.assign(this.publishers[index], partialPublisher);

      this.http.put(`${this.url}/${id}`, this.publishers[index])
        .subscribe();
    });
  }

  deletePublisher(id: number): void {
    this.getPublishers().subscribe(() => {
      const index = this.publishers.findIndex(p => p.publisherId === id);
      this.publishers.splice(
        index,
        1
      );
    });
    this.http.delete(`${this.url}/${id}`)
      .subscribe();
  }

  postPublisher(publisher: Publisher): void {
    this.http.post(this.url, publisher).subscribe((p: Publisher) => {
      this.getPublishers().subscribe(() => {
        if (!this.publishers.find(elm => elm.publisherId === p.publisherId)) {
          this.publishers.unshift(p);
        }
      });
    });
  }
}
