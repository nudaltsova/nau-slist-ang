
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

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
    protected stores: SlStore[] = [];

  constructor(
       protected override entityService: SlListService,
       protected override modalService: NgbModal,
       protected override inRouter: ActivatedRoute,
       protected override outRouter: Router,
       protected override formBuilder: FormBuilder,
       protected storeService: SlStoreService,
       ) {
      super(entityService, modalService, inRouter, outRouter, formBuilder);

      this.redirectBackUrl = "/lists";
      this.editForm = this.formBuilder.group({
        date: '',
        store: '',
      });

      super.logMessage("ok");
  }

  protected updateFormValues(){
    this.editForm.patchValue({
      date: this.entity.date,
      store: this.entity.store.id,
    });
  }

  protected updateEntityValues(){
    this.entity.date = this.editForm.get(['date'])!.value;
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

