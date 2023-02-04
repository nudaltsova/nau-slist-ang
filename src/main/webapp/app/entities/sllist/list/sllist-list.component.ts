
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { CrudListComponent } from 'src/main/webapp/app/core/crud/crud-list.component'

import { SlList } from 'src/main/webapp/app/entities/sllist/sllist-model'
import { SlListService } from 'src/main/webapp/app/entities/sllist/sllist-service'

@Component({
  selector: 'list-list',
  templateUrl: './sllist-list.component.html'
})
export class SlListListComponent extends CrudListComponent<SlList> {
  constructor(
       protected override entityService: SlListService,
       protected override modalService: NgbModal,
       protected override routerService: ActivatedRoute) {
    super(entityService, modalService, routerService);
  }
}