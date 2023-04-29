
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { CrudListComponent } from 'src/main/webapp/app/core/crud/crud-list.component'
import { environment } from 'src/main/webapp/environments/environment';

import { SlItem } from 'src/main/webapp/app/entities/slitem/slitem-model'
import { SlItemService } from 'src/main/webapp/app/entities/slitem/slitem-service'
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'item-list',
  templateUrl: './slitem-list.component.html'
})
export class SlItemListComponent extends CrudListComponent<SlItem> {
  @Input()
  departmentId: number;

  constructor(
       protected override entityService: SlItemService,
       protected override modalService: NgbModal,
       protected override routerService: ActivatedRoute) {
    super(entityService, modalService, routerService);
  }

  
  protected override loadPage(page: number): void {
    if (page < 0) {
      return;
    }
    if (! this.departmentId ) {
      return;
    }
   this.isLoading = true;
    this.lastError = ""

    let queryParams = "?department.equal=" + this.departmentId;
    queryParams = queryParams + "&page=" + page;
    queryParams = queryParams + "&size=" + environment.itemsPerPage;
    queryParams = queryParams + "&sort=orderNum";
    queryParams = queryParams + "," + (this.sortDirection ? "ASC" : "DESC");

    this.entityService.getAll(queryParams).subscribe({
      next: (res: HttpResponse<SlItem[]>) => {
        this.onLoadPageSuccess(res.body, res.headers, page);
      },
      error: (error: any) => {
        super.onError(error);
        this.lastError = super.lastErrorMsg;
      },
    });
  }

  
  itemUp(itemId : number) : void {
    this.entityService.itemUp(itemId).subscribe({
      next: (res: HttpResponse<SlItem>) => {
        this.loadPage(this.page);
      },
      error: (error: any) => {
        super.onError(error);
      },
    });

  }

  itemDown(itemId : number) : void {
    this.entityService.itemDown(itemId).subscribe({
      next: (res: HttpResponse<SlItem>) => {
        this.loadPage(this.page);
      },
      error: (error: any) => {
        super.onError(error);
      },
    });

  }
}