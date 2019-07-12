import { Injectable } from '@angular/core';

import { Game, Developer, Publisher, EntityInfo } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor() { }

  getEntityInfo(entity: Game | Developer | Publisher): EntityInfo {
    let entityInfo: EntityInfo;
    if ('gameId' in entity) {
      entityInfo = {
        id: entity.gameId,
        entityName: 'game'
      };
    } else if ('developerId' in entity) {
      entityInfo = {
        id: entity.developerId,
        entityName: 'developer'
      };
    } else {
      entityInfo = {
        id: entity.publisherId,
        entityName: 'publisher'
      };
    }
    return entityInfo;
  }
}
