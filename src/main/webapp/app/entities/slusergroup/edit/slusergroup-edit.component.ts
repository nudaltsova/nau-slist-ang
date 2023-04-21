
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';

import { CrudEditComponent } from 'src/main/webapp/app/core/crud/crud-edit.component'

import { SlGroup } from 'src/main/webapp/app/entities/slgroup/slgroup-model'
import { SlGroupService } from 'src/main/webapp/app/entities/slgroup/slgroup-service'
import { SlUser } from 'src/main/webapp/app/entities/sluser/sluser-model'
import { SlUserGroup } from 'src/main/webapp/app/entities/slusergroup/slusergroup-model'
import { SlUserGroupService } from 'src/main/webapp/app/entities/slusergroup/slusergroup-service'
import { SlUserService } from 'src/main/webapp/app/entities/sluser/sluser-service'

@Component({
  selector: 'user-group-edit',
  templateUrl: './slusergroup-edit.component.html'
})
export class SlUserGroupDetailsComponent extends CrudEditComponent<SlUserGroup> {
    protected users: SlUser[] = [];
    protected groups: SlGroup[] = [];

  constructor(
       protected override entityService: SlUserGroupService,
       protected override modalService: NgbModal,
       protected override inRouter: ActivatedRoute,
       protected override outRouter: Router,
       protected override formBuilder: FormBuilder,
       protected override location: Location,
       protected userService: SlUserService,
       protected groupService: SlGroupService,
       ) {
      super(entityService, modalService, inRouter, outRouter, formBuilder, location);

      this.editForm = this.formBuilder.group({
        approved: '',
        user: '',
        group: '',
      });

      super.logMessage("ok");
  }

  protected updateFormValues(){
    this.editForm.patchValue({
          approved: this.entity.approved,
          user: this.entity.user.id,
          group: this.entity.group.id,
    });
      if(this.users.length === 1)
        this.editForm.controls['user'].setValue(this.users[0].id, {onlySelf: true});
      if(this.groups.length === 1)
        this.editForm.controls['group'].setValue(this.groups[0].id, {onlySelf: true});

  }

  protected updateEntityValues(){
    this.entity.approved = this.editForm.get(['approved'])!.value;
    this.entity.user.id = this.editForm.get(['user'])!.value;
    this.entity.group.id = this.editForm.get(['group'])!.value;
  }


  protected loadRelatedItems(): void {
    let queryParams = '';
    queryParams = "?page=0&size=1000&sort=name,ASC";
    this.userService.getAll(queryParams).subscribe({
      next: (res: HttpResponse<SlUser[]>) => {
        this.users = res.body;
        this.updateFormValues();
      },
      error: (error: any) => {
        super.onError(error);
      },
    });
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

