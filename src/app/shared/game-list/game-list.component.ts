import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Game, HeaderTag } from '../types';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  @Input() games: Game[];
  @Input() gameHeaderTag: HeaderTag;
  @Input() genreHeaderTag: string;
  @Input() canEditGame: boolean;
  @Input() haveEditGameHandler: boolean;
  @Input() gameNameAsLink: boolean;

  @Output() gameEditing = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
