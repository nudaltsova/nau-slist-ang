
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

import { CrudEditComponent } from 'src/main/webapp/app/core/crud/crud-edit.component'

import { SlUser } from 'src/main/webapp/app/entities/sluser/sluser-model'
import { SlUserGroup } from 'src/main/webapp/app/entities/slusergroup/slusergroup-model'
import { SlUserGroupService } from 'src/main/webapp/app/entities/slusergroup/slusergroup-service'
import { SlUserService } from 'src/main/webapp/app/entities/sluser/sluser-service'

@Component({
  selector: 'user-edit',
  templateUrl: './sluser-edit.component.html'
})
export class SlUserDetailsComponent extends CrudEditComponent<SlUser> {

  constructor(
       protected override entityService: SlUserService,
       protected override modalService: NgbModal,
       protected override inRouter: ActivatedRoute,
       protected override outRouter: Router,
       protected override formBuilder: FormBuilder,
       ) {
      super(entityService, modalService, inRouter, outRouter, formBuilder);

      this.redirectBackUrl = "/users";
      this.editForm = this.formBuilder.group({
        name: '',
        login: '',
      });

      super.logMessage("ok");
  }

  protected updateFormValues(){
    this.editForm.patchValue({
      name: this.entity.name,
      login: this.entity.login,
    });
  }

  protected updateEntityValues(){
    this.entity.name = this.editForm.get(['name'])!.value;
    this.entity.login = this.editForm.get(['login'])!.value;
  }


  protected loadRelatedItems(): void {
    let queryParams = '';
  }

}

