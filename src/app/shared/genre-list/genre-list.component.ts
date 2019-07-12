import { Component, OnInit, Input } from '@angular/core';

import { GameXrefGenre, Genre, HeaderTag } from '../types';
import { GenresService } from 'src/app/services/genres.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {
  @Input() headerTag: HeaderTag;
  @Input() gameXrefGenres: GameXrefGenre[];
  @Input() genres: Genre[];
  @Input() canEditGenre: boolean;

  constructor(private genresService: GenresService) { }

  ngOnInit() {
    if (this.gameXrefGenres) {
      this.genresService.getGenres().subscribe(genres => {
        this.genres = this.gameXrefGenres.map(
          xref => genres.find(genre => genre.genreId === xref.genreId)
        );
      });
    }
  }

}
