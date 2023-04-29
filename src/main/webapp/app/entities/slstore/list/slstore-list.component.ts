
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { CrudListComponent } from 'src/main/webapp/app/core/crud/crud-list.component'

import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { SlStoreService } from 'src/main/webapp/app/entities/slstore/slstore-service'

@Component({
  selector: 'store-list',
  templateUrl: './slstore-list.component.html'
})
export class SlStoreListComponent extends CrudListComponent<SlStore> {
  constructor(
       protected override entityService: SlStoreService,
       protected override modalService: NgbModal,
       protected override routerService: ActivatedRoute) {
    super(entityService, modalService, routerService);
  }

  getEntities(): SlStore[]{
    if(this.entities.length == 0)
      return [];
    super.logMessage("getEntities");
    return this.entities;
  }
}