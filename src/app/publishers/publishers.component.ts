import { Component, OnInit } from '@angular/core';

import { Publisher } from '../shared/types';
import { PublishersService } from '../services/publishers.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit {
  publishers: Publisher[];

  constructor(private publishersService: PublishersService) { }

  ngOnInit() {
    this.publishersService.getPublishers()
      .subscribe(publishers => this.publishers = publishers);
  }

}
