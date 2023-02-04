
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { CrudListComponent } from 'src/main/webapp/app/core/crud/crud-list.component'

import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'
import { SlDepartmentService } from 'src/main/webapp/app/entities/sldepartment/sldepartment-service'

@Component({
  selector: 'department-list',
  templateUrl: './sldepartment-list.component.html'
})
export class SlDepartmentListComponent extends CrudListComponent<SlDepartment> {
  constructor(
       protected override entityService: SlDepartmentService,
       protected override modalService: NgbModal,
       protected override routerService: ActivatedRoute) {
    super(entityService, modalService, routerService);
  }
}