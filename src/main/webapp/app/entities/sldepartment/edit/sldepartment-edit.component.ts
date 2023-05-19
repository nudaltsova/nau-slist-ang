
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';

import { CrudEditComponent } from 'src/main/webapp/app/core/crud/crud-edit.component'

import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'
import { SlDepartmentService } from 'src/main/webapp/app/entities/sldepartment/sldepartment-service'
import { SlItem } from 'src/main/webapp/app/entities/slitem/slitem-model'
import { SlItemService } from 'src/main/webapp/app/entities/slitem/slitem-service'
import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { SlStoreService } from 'src/main/webapp/app/entities/slstore/slstore-service'

@Component({
  selector: 'department-edit',
  templateUrl: './sldepartment-edit.component.html'
})
export class SlDepartmentDetailsComponent extends CrudEditComponent<SlDepartment> {
  protected stores: SlStore[] = [];
  protected groupId: -1;

  constructor(
    protected override entityService: SlDepartmentService,
    protected override modalService: NgbModal,
    protected override inRouter: ActivatedRoute,
    protected override outRouter: Router,
    protected override formBuilder: FormBuilder,
    protected override location: Location,
    protected storeService: SlStoreService,
    
  ) {
    super(entityService, modalService, inRouter, outRouter, formBuilder, location);

    this.editForm = this.formBuilder.group({
      name: '',
      orderNum: '',
      store: '',
    });

    super.logMessage("ok");
  }

  protected updateFormValues() {
    this.editForm.patchValue({
      name: this.entity.name,
      orderNum: this.entity.orderNum,
      store: this.entity.store.id,
    });
    if (this.stores.length === 1)
      this.editForm.controls['store'].setValue(this.stores[0].id, { onlySelf: true });

  }

  protected updateEntityValues() {
    this.entity.name = this.editForm.get(['name'])!.value;
    this.entity.orderNum = this.editForm.get(['orderNum'])!.value;
    this.entity.store.id = this.editForm.get(['store'])!.value;
  }


  protected loadRelatedItems(): void {
    let queryParams = '';
    queryParams = "?page=0&size=1000&sort=name,ASC";
    this.storeService.getAll(queryParams).subscribe({
      next: (res: HttpResponse<SlStore[]>) => {
        this.stores = res.body;
        this.updateFormValues();
      },
      error: (error: any) => {
        super.onError(error);
      },
    });
  }

}

