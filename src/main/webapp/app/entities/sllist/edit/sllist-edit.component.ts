
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';

import { CrudEditComponent } from 'src/main/webapp/app/core/crud/crud-edit.component'

import { SlItem } from 'src/main/webapp/app/entities/slitem/slitem-model'
import { SlItemService } from 'src/main/webapp/app/entities/slitem/slitem-service'
import { SlList } from 'src/main/webapp/app/entities/sllist/sllist-model'
import { SlListService } from 'src/main/webapp/app/entities/sllist/sllist-service'
import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { SlStoreService } from 'src/main/webapp/app/entities/slstore/slstore-service'

@Component({
  selector: 'list-edit',
  templateUrl: './sllist-edit.component.html'
})
export class SlListDetailsComponent extends CrudEditComponent<SlList> {
  protected doCopy = false;
  protected activeStore = -1;
  protected listDate: Date;

  constructor(
    protected override entityService: SlListService,
    protected override modalService: NgbModal,
    protected override inRouter: ActivatedRoute,
    protected override outRouter: Router,
    protected override formBuilder: FormBuilder,
    protected override location: Location,
    protected storeService: SlStoreService,
  ) {
    super(entityService, modalService, inRouter, outRouter, formBuilder, location);

    this.editForm = this.formBuilder.group({
      date: '',
      store: '',
    });

    super.logMessage("ok");
  }

  override ngOnInit(): void {
    this.activeStore = Number(this.inRouter.snapshot.url[1] + '');
    this.action = this.inRouter.snapshot.url[0] + '';
    this.doCopy = this.action === "copy";
    this.inRouter.data.subscribe(({ data }) => {
      this.onEntityLoaded(data);
    });
  }


  protected override onEntityLoaded(data: SlList | null): void {
    super.logMessage("onEntityLoaded: entity = ", this.entity);
    if (data != null) {
      this.entity = data;
      if (this.action === 'new') {
        this.entity.date = (new Date()).getTime();
        this.entity.store = new SlStore();
      }
      if(this.doCopy){
        this.entity.id = null;
        this.entity.date = (new Date()).getTime();
      }
   
      this.loadRelatedItems();
    }
  }

  protected updateFormValues() {
    this.editForm.patchValue({
      date: this.entity.date,
      store: this.entity.store.id,
    });
  }

  protected updateEntityValues() {
    this.entity.date = this.editForm.get(['date'])!.value;
    this.entity.store.id = this.editForm.get(['store'])!.value;
  }

  protected loadRelatedItems(): void {
    this.listDate = new Date(this.entity.date);
    let loadStoreId = -1;
    if (this.action === 'new')
      loadStoreId = this.activeStore;
    else
      loadStoreId = this.entity.store.id;
    this.storeService.get(loadStoreId).subscribe({
      next: (res: HttpResponse<SlStore>) => {
        this.entity.store = res.body;
        this.updateFormValues();
      },
      error: (error: any) => {
        super.onError(error);
      },
    });
 }

}

