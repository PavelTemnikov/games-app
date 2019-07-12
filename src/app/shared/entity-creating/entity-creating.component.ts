import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { DevelopersService } from '../../services/developers.service';
import { PublishersService } from '../../services/publishers.service';
import { GenresService } from '../../services/genres.service';

@Component({
  selector: 'app-entity-creating',
  templateUrl: './entity-creating.component.html',
  styleUrls: ['./entity-creating.component.scss']
})
export class EntityCreatingComponent implements OnInit {
  @Input() entityName: 'developer' | 'publisher' | 'genre';
  entityNameControl = new FormControl('', [Validators.required, Validators.maxLength(25)]);

  constructor(
    private developersService: DevelopersService,
    private publishersService: PublishersService,
    private genresService: GenresService
  ) { }

  ngOnInit() { }

  add() {
    if (this.entityName === 'developer') {
      this.developersService.postDeveloper({
        developerId: 0,
        name: this.entityNameControl.value
      });
    } else if (this.entityName === 'publisher') {
      this.publishersService.postPublisher({
        publisherId: 0,
        name: this.entityNameControl.value
      });
    } else {
      this.genresService.postGenre({
        genreId: 0,
        name: this.entityNameControl.value
      });
    }
    this.entityNameControl.reset();
  }

}
