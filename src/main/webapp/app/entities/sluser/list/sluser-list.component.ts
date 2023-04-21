
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { CrudListComponent } from 'src/main/webapp/app/core/crud/crud-list.component'

import { SlUser } from 'src/main/webapp/app/entities/sluser/sluser-model'
import { SlUserService } from 'src/main/webapp/app/entities/sluser/sluser-service'

@Component({
  selector: 'user-list',
  templateUrl: './sluser-list.component.html'
})
export class SlUserListComponent extends CrudListComponent<SlUser> {
  constructor(
       protected override entityService: SlUserService,
       protected override modalService: NgbModal,
       protected override routerService: ActivatedRoute) {
    super(entityService, modalService, routerService);
  }
}