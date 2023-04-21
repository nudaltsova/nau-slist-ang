
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

@Component({
  selector: 'item-edit',
  templateUrl: './slitem-edit.component.html'
})
export class SlItemDetailsComponent extends CrudEditComponent<SlItem> {
    protected departments: SlDepartment[] = [];

  constructor(
       protected override entityService: SlItemService,
       protected override modalService: NgbModal,
       protected override inRouter: ActivatedRoute,
       protected override outRouter: Router,
       protected override formBuilder: FormBuilder,
       protected override location: Location,
       protected departmentService: SlDepartmentService,
       ) {
      super(entityService, modalService, inRouter, outRouter, formBuilder, location);

      this.editForm = this.formBuilder.group({
        name: '',
        orderNum: '',
        department: '',
      });

      super.logMessage("ok");
  }

  protected updateFormValues(){
    this.editForm.patchValue({
          name: this.entity.name,
          orderNum: this.entity.orderNum,
          department: this.entity.department.id,
    });
      if(this.departments.length === 1)
        this.editForm.controls['department'].setValue(this.departments[0].id, {onlySelf: true});

  }

  protected updateEntityValues(){
    this.entity.name = this.editForm.get(['name'])!.value;
    this.entity.orderNum = this.editForm.get(['orderNum'])!.value;
    this.entity.department.id = this.editForm.get(['department'])!.value;
  }


  protected loadRelatedItems(): void {
    let queryParams = '';
    queryParams = "?page=0&size=1000&sort=name,ASC";
    this.departmentService.getAll(queryParams).subscribe({
      next: (res: HttpResponse<SlDepartment[]>) => {
        this.departments = res.body;
        this.updateFormValues();
      },
      error: (error: any) => {
        super.onError(error);
      },
    });
  }

}

