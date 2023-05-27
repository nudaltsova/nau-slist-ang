
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/main/webapp/environments/environment';

import { CrudListComponent } from 'src/main/webapp/app/core/crud/crud-list.component'

import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'
import { SlDepartmentService } from 'src/main/webapp/app/entities/sldepartment/sldepartment-service'
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'department-list',
  templateUrl: './sldepartment-list.component.html'
})
export class SlDepartmentListComponent extends CrudListComponent<SlDepartment> {
  @Input()
  storeId: number;

  constructor(
    protected override entityService: SlDepartmentService,
    protected override modalService: NgbModal,
    protected override routerService: ActivatedRoute) {
    super(entityService, modalService, routerService);
  }

  protected override bulldQuery(page: number): string {
    if (this.storeId) {
      let queryParams = "?store.equal=" + this.storeId;
      queryParams = queryParams + "&page=" + page;
      queryParams = queryParams + "&size=" + environment.itemsPerPage;
      queryParams = queryParams + "&sort=orderNum";
      queryParams = queryParams + "," + (this.sortDirection ? "ASC" : "DESC");
      return queryParams;
    }
    return null;
  }

  departmentUp(departmentId: number): void {
    this.entityService.departmentUp(departmentId).subscribe({
      next: (res: HttpResponse<SlDepartment>) => {
        this.loadPage(this.page);
      },
      error: (error: any) => {
        super.onError(error);
      },
    });

  }

  departmentDown(departmentId: number): void {
    this.entityService.departmentDown(departmentId).subscribe({
      next: (res: HttpResponse<SlDepartment>) => {
        this.loadPage(this.page);
      },
      error: (error: any) => {
        super.onError(error);
      },
    });

  }

  ngOnChanges() {
    this.loadPage(0);
  }
}