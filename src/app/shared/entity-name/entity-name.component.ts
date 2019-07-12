import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Game, Developer, Publisher, EntityName, HeaderTag, LinkData, Genre } from '../types';
import { GamesService } from '../../services/games.service';
import { DevelopersService } from '../../services/developers.service';
import { PublishersService } from '../../services/publishers.service';
import { EntityService } from '../../services/entity.service';
import { GenresService } from '../../services/genres.service';

@Component({
  selector: 'app-entity-name',
  templateUrl: './entity-name.component.html',
  styleUrls: ['./entity-name.component.scss']
})
export class EntityNameComponent implements OnInit {
  @Input() headerTag: HeaderTag;
  @Input() entity: Game | Developer | Publisher | Genre;
  @Input() canEdit: boolean;
  @Input() haveEditHandler: boolean;
  @Input() asLink: boolean;

  @Output() editing = new EventEmitter<number>();

  entityId: number;
  linkData: LinkData;
  entityName: EntityName;
  isEditing = false;
  entityNameControl = new FormControl('', [Validators.required, Validators.maxLength(25)]);

  constructor(
    private gamesService: GamesService,
    private developersService: DevelopersService,
    private publishersService: PublishersService,
    private entityService: EntityService,
    private genresService: GenresService
  ) { }

  ngOnInit() {
    if (this.asLink && !('genreId' in this.entity)) {
      const { id, entityName } = this.entityService.getEntityInfo(this.entity);
      this.entityId = id;
      this.linkData = { id, path: `/${entityName}s` };
    }
  }

  edit() {
    if (this.haveEditHandler) {
      this.editing.emit(this.entityId);
      return;
    }
    this.isEditing = true;
    this.entityNameControl.setValue(this.entity.name);
  }

  save() {
    this.isEditing = false;
    const name = this.entityNameControl.value;
    if ('developerId' in this.entity) {
      this.developersService.putDeveloper(this.entity.developerId, { name });

    } else if ('publisherId' in this.entity) {
      this.publishersService.putPublisher(this.entity.publisherId, { name });

    } else if ('genreId' in this.entity) {
      this.genresService.putGenre(this.entity.genreId, { name });
    }
  }

  delete() {
    this.isEditing = false;
    if ('gameId' in this.entity) {
      this.gamesService.deleteGame(this.entity.gameId);
    } else if ('developerId' in this.entity) {
      this.developersService.deleteDeveloper(this.entity.developerId);
    } else if ('publisherId' in this.entity) {
      this.publishersService.deletePublisher(this.entity.publisherId);
    } else {
      this.genresService.deleteGenre(this.entity.genreId);
    }
  }

}
