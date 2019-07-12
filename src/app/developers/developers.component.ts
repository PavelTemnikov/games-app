import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Developer } from '../shared/types';
import { DevelopersService } from '../services/developers.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss']
})
export class DevelopersComponent implements OnInit {
  developers: Developer[];
  developerName = new FormControl('', [Validators.required, Validators.maxLength(25)]);
  isEditing: boolean;

  constructor(private developersService: DevelopersService) { }

  ngOnInit() {
    this.developersService.getDevelopers()
      .subscribe(developers => this.developers = developers);
  }

}
