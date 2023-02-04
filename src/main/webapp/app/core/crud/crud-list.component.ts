import { Component, OnInit } from '@angular/core';
import { environment } from 'src/main/webapp/environments/environment';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalDialog } from '../modal/modal-dialog.component';
import { ModalDialogModule } from '../modal/modal-dialog.module';

import { AbstractEntityWithLabel, AbstractCrudComponent } from './crud.entity.model';
import { CrudService } from './crud.service';

@Component({
  template: ''
})
export abstract class CrudListComponent<E extends AbstractEntityWithLabel> extends AbstractCrudComponent implements OnInit {
  protected entities: E[] = [];
  protected page: number = 0;
  protected totalItems: number = 0;
  protected totalPages: number = 0;
  protected sortItem: string = "id";
  protected sortDirection: boolean = true;
  protected hasNext = false;
  protected hasPrev = false;
 
  constructor(
    protected entityService: CrudService<E>,
    protected modalService: NgbModal,
    protected routerService?: ActivatedRoute) {
      super();
    }

  ngOnInit(): void {
    this.loadPage(0);
  }

  sortBy(colName: string) {
    if (this.sortItem === colName)
      this.sortDirection = !this.sortDirection;
    else this.sortDirection = true;

    this.sortItem = colName;
    this.page = 0;
    this.loadPage(0);
  }

  deleteItem(id: number) {
    const entityToDelete = this.getSelectedItem(id);
    if (entityToDelete == null)
      return;

    const modalRef = this.modalService.open(ModalDialog);
    modalRef.componentInstance.message = this.getDeleteMessage(entityToDelete);
    modalRef.result.then((result) => {
      if (result) {
        this.entityService.delete(entityToDelete).subscribe({
          next: (res: HttpResponse<{}>) => {
            this.onDeleteItemSuccess(res);
          },
          error: (error: any) => {
            super.onError(error);
            this.lastError = super.lastErrorMsg;
          },
        });
      }
    });
  }

  protected loadPage(page: number): void {
    if (page < 0) {
      return;
    }
    this.isLoading = true;
    this.lastError = ""

    let queryParams = "?page=" + page;
    queryParams = queryParams + "&size=" + environment.itemsPerPage;
    queryParams = queryParams + "&sort=" + this.sortItem;
    queryParams = queryParams + "," + (this.sortDirection ? "ASC" : "DESC");

    this.entityService.getAll(queryParams).subscribe({
      next: (res: HttpResponse<E[]>) => {
        this.onLoadPageSuccess(res.body, res.headers, page);
      },
      error: (error: any) => {
        super.onError(error);
        this.lastError = super.lastErrorMsg;
        this.isLoading = true;
      },
    });

  }

  protected onLoadPageSuccess(data: E[] | null, headers: HttpHeaders, page: number): void {
    const totalCount = headers.get('X-Total-Count');
    if (totalCount != null) {
      this.totalItems = Number(totalCount);
    }
    this.page = page;
    this.hasPrev = page > 0;
    this.hasNext = environment.itemsPerPage * (page + 1) < this.totalItems;
    this.totalPages =  Math.ceil(this.totalItems/environment.itemsPerPage);
    this.entities = data ?? [];
    this.isLoading = false;
    super.logMessage("onLoadPageSuccess: entities = ", this.entities);
  }

  protected onDeleteItemSuccess(response: HttpResponse<{}>): void {
    this.loadPage(this.page);
    super.logMessage("onDeleteItemSuccess: item deleted", this.entities);
  }


  protected getSelectedItem(id: number): E | null {
    for (var nextEntity of this.entities) {
      if (nextEntity.id === id) {
        return nextEntity;
      }
    }
    return null;
  }

  protected getDeleteMessage(entityToDelete: E): string {
    return 'Are you sure you want to delete item with id ' + entityToDelete.id;
  }

}
