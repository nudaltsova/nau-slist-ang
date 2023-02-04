
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

import { CrudEditComponent } from 'src/main/webapp/app/core/crud/crud-edit.component'

import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'
import { SlDepartmentService } from 'src/main/webapp/app/entities/sldepartment/sldepartment-service'
import { SlGroup } from 'src/main/webapp/app/entities/slgroup/slgroup-model'
import { SlGroupService } from 'src/main/webapp/app/entities/slgroup/slgroup-service'
import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { SlStoreService } from 'src/main/webapp/app/entities/slstore/slstore-service'

@Component({
  selector: 'store-edit',
  templateUrl: './slstore-edit.component.html'
})
export class SlStoreDetailsComponent extends CrudEditComponent<SlStore> {
    protected groups: SlGroup[] = [];

  constructor(
       protected override entityService: SlStoreService,
       protected override modalService: NgbModal,
       protected override inRouter: ActivatedRoute,
       protected override outRouter: Router,
       protected override formBuilder: FormBuilder,
       protected groupService: SlGroupService,
       ) {
      super(entityService, modalService, inRouter, outRouter, formBuilder);

      this.redirectBackUrl = "/stores";
      this.editForm = this.formBuilder.group({
        name: '',
        country: '',
        group: '',
      });

      super.logMessage("ok");
  }

  protected updateFormValues(){
    this.editForm.patchValue({
      name: this.entity.name,
      country: this.entity.country,
      group: this.entity.group.id,
    });
  }

  protected updateEntityValues(){
    this.entity.name = this.editForm.get(['name'])!.value;
    this.entity.country = this.editForm.get(['country'])!.value;
    this.entity.group.id = this.editForm.get(['group'])!.value;
  }


  protected loadRelatedItems(): void {
    let queryParams = '';
    queryParams = "?page=0&size=1000&sort=name,ASC";
    this.groupService.getAll(queryParams).subscribe({
      next: (res: HttpResponse<SlGroup[]>) => {
        this.groups = res.body;
        this.updateFormValues();
      },
      error: (error: any) => {
        super.onError(error);
      },
    });
  }

}

