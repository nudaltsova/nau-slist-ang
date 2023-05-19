
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
import { NavigationService } from 'src/main/webapp/app/core/navigation'

@Component({
  selector: 'store-edit',
  templateUrl: './slstore-edit.component.html'
})
export class SlStoreDetailsComponent extends CrudEditComponent<SlStore> {
  protected doCopy = false;
  protected groupId: number = -1;
  protected groups: SlGroup[] = [];
  protected stores: SlStore[] = [];

  constructor(
    protected override entityService: SlStoreService,
    protected override modalService: NgbModal,
    protected override inRouter: ActivatedRoute,
    protected override outRouter: Router,
    protected override formBuilder: FormBuilder,
    protected override location: Location,
    protected groupService: SlGroupService,
    protected navigationHistory: NavigationService
  ) {
    super(entityService, modalService, inRouter, outRouter, formBuilder, location);

    this.editForm = this.formBuilder.group({
      name: '',
      country: '',
      group: '',
      store: ''
    });

    super.logMessage("ok");
  }

  protected updateFormValues() {
    if (this.parentId)
      this.groupId = Number(this.parentId);

    this.editForm.patchValue({
      name: this.entity.name,
      country: this.entity.country,
      group: this.entity.group.id,
    });

    this.editForm.controls['country'].setValue("Ireland", { onlySelf: true });
    this.editForm.controls['country'].disable();

    if (this.groups.length === 1) {
      this.editForm.controls['group'].setValue(this.groups[0].id, { onlySelf: true });
      this.editForm.controls['group'].disable();
    }
    if (this.groupId > 0) {
      this.editForm.controls['group'].setValue(this.groupId, { onlySelf: true });
      this.editForm.controls['group'].disable();
    }

    if (this.doCopy && this.stores.length === 1) {
      let storeId = this.stores[0].id;
      this.editForm.controls['store'].setValue(storeId, { onlySelf: true });
    }

  }

  protected updateEntityValues() {
    this.entity.name = this.editForm.get(['name'])!.value;
    this.entity.country = this.editForm.get(['country'])!.value;
    this.entity.group.id = this.editForm.get(['group'])!.value;
  }

  override updateEntity() {
    if (!this.doCopy) {
      this.updateEntityValues();
      super.updateEntity();
      return;
    };

    let query = "storeId=" + this.editForm.get(['store'])!.value;
    query = query + "&newName=" + this.editForm.get(['name'])!.value;;
    query = query + "&groupId=" + this.editForm.get(['group'])!.value;;
    this.entityService.copyStore(query).subscribe({
      next: (res: HttpResponse<SlStore>) => {
        super.goBack();
      },
      error: (error: any) => {
        super.onError(error);
        this.lastError = "Failed to save an entity"
      },
    })
  }


  protected loadRelatedItems(): void {
    this.doCopy = this.action === "copy";
    let queryParams = '';
    queryParams = "?page=0&size=1000&sort=name,ASC";
    this.groupService.getAll(queryParams).subscribe({
      next: (res: HttpResponse<SlGroup[]>) => {
        this.groups = res.body;
        this.updateFormValues();

        if (this.doCopy) {
          this.entityService.getSystemStores().subscribe({
            next: (res: HttpResponse<SlGroup[]>) => {
              this.stores = res.body;
              this.updateFormValues();
            },
            error: (error: any) => {
              super.onError(error);
            },
          });
        }
      },
      error: (error: any) => {
        super.onError(error);
      },
    });
  }
  protected override onEntityUpdated(data: SlStore | null): void {
    super.logMessage("onEntityUpdated: entity = ", this.entity);
    if (data != null)
      this.entity = data;
    if (this.action === "new")
      this.outRouter.navigate(['/stores/edit/' + this.entity.id]);
  }

  getEntityId(): number {
    return this.entity.id;
  }

  
  protected override goBack(): void{
    const redirectURL = this.navigationHistory.getRedirectBack();
    this.location.back();
  }

}

