import { Component, OnInit } from '@angular/core';

import { Genre } from '../shared/types';
import { GenresService } from '../services/genres.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: Genre[];

  constructor(private genresService: GenresService) { }

  ngOnInit() {
    this.genresService.getGenres()
      .subscribe(genres => this.genres = genres);
  }

}
