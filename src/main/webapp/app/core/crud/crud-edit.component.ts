import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AbstractEntityWithLabel, AbstractCrudComponent } from './crud.entity.model';
import { CrudService } from './crud.service';

@Component({
  template: ''
})
export abstract class CrudEditComponent<E extends AbstractEntityWithLabel> extends AbstractCrudComponent implements OnInit {
  protected entity?: E;
  protected action: string = "undefined";
  protected redirectBackUrl: string = "/";

  editForm: FormGroup = null;

  constructor(
    protected entityService: CrudService<E>,
    protected modalService: NgbModal,
    protected inRouter: ActivatedRoute,
    protected outRouter: Router,
    protected formBuilder?: FormBuilder) {
    super();
  }

  protected abstract updateFormValues(): void;
  protected abstract updateEntityValues(): void;
  protected abstract loadRelatedItems(): void;

  ngOnInit(): void {
    this.action = this.inRouter.snapshot.url[0] + '';
    this.inRouter.data.subscribe(({ data }) => {
      this.onEntityLoaded(data);
    });
  }

  updateEntity() {
    if (this.entity != null) {
      this.updateEntityValues();
      this.entityService.update(this.entity).subscribe({
        next: (res: HttpResponse<E>) => {
          this.onEntityUpdated(res.body);
        },
        error: (error: any) => {
          super.onError(error);
          this.lastError = "Failed to save an entity"
        },
      })
    };
  }

  protected onEntityLoaded(data: E | null): void {
    super.logMessage("onEntityLoaded: entity = ", this.entity);
    if (data != null) {
      this.entity = data;
      this.loadRelatedItems();
      this.updateFormValues();
    }
  }

  protected onEntityUpdated(data: E | null): void {
    super.logMessage("onEntityUpdated: entity = ", this.entity);
    if (data != null)
      this.entity = data;
    this.outRouter.navigate([this.redirectBackUrl]);
  }
}
