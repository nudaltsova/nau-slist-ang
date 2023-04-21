
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { CrudListComponent } from 'src/main/webapp/app/core/crud/crud-list.component'

import { SlUserGroup } from 'src/main/webapp/app/entities/slusergroup/slusergroup-model'
import { SlUserGroupService } from 'src/main/webapp/app/entities/slusergroup/slusergroup-service'

@Component({
  selector: 'user-group-list',
  templateUrl: './slusergroup-list.component.html'
})
export class SlUserGroupListComponent extends CrudListComponent<SlUserGroup> {
  constructor(
       protected override entityService: SlUserGroupService,
       protected override modalService: NgbModal,
       protected override routerService: ActivatedRoute) {
    super(entityService, modalService, routerService);
  }
}