
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';

import { CrudEditComponent } from 'src/main/webapp/app/core/crud/crud-edit.component'

import { SlGroup } from 'src/main/webapp/app/entities/slgroup/slgroup-model'
import { SlGroupService } from 'src/main/webapp/app/entities/slgroup/slgroup-service'
import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { SlStoreService } from 'src/main/webapp/app/entities/slstore/slstore-service'
import { SlUserGroup } from 'src/main/webapp/app/entities/slusergroup/slusergroup-model'
import { SlUserGroupService } from 'src/main/webapp/app/entities/slusergroup/slusergroup-service'

@Component({
  selector: 'group-edit',
  templateUrl: './slgroup-edit.component.html'
})
export class SlGroupDetailsComponent extends CrudEditComponent<SlGroup> {

  constructor(
       protected override entityService: SlGroupService,
       protected override modalService: NgbModal,
       protected override inRouter: ActivatedRoute,
       protected override outRouter: Router,
       protected override formBuilder: FormBuilder,
       protected override location: Location,
       ) {
      super(entityService, modalService, inRouter, outRouter, formBuilder, location);

      this.editForm = this.formBuilder.group({
        name: '',
      });

      super.logMessage("ok");
  }

  protected updateFormValues(){
    this.editForm.patchValue({
          name: this.entity.name,
    });

  }

  protected updateEntityValues(){
    this.entity.name = this.editForm.get(['name'])!.value;
  }


  protected loadRelatedItems(): void {
    let queryParams = '';
  }

}

