import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'
import { SlGroup } from 'src/main/webapp/app/entities/slgroup/slgroup-model'
import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { SlStoreDetailsComponent } from 'src/main/webapp/app/entities/slstore/edit/slstore-edit.component'
import { SlStoreListComponent } from 'src/main/webapp/app/entities/slstore/list/slstore-list.component'
import { SlStoreService } from 'src/main/webapp/app/entities/slstore/slstore-service'
import { CrudResolveService } from 'src/main/webapp/app/core/crud/crud.resolver'


@Injectable({
  providedIn: 'root'
})
export class SlStoreResolveService extends CrudResolveService<SlStore> {
  constructor(protected override service: SlStoreService) {
    super(service);
  }

  protected createNew(): SlStore {
    const result = new SlStore();

    result.group = new SlGroup();
    return result;
  }

}
const SlStoreRoute: Routes = [
  {
    path: '',
    component: SlStoreListComponent,
  },
  {
    path: 'view/:id',
    component: SlStoreDetailsComponent,
    resolve: {
      data: SlStoreResolveService,
    },
  },
  {
    path: 'edit/:id',
    component: SlStoreDetailsComponent,
    resolve: {
      data: SlStoreResolveService,
    },
  },
  {
    path: 'new',
    component: SlStoreDetailsComponent,
    resolve: {
      data: SlStoreResolveService,
    },
  },
  {
    path: 'copy',
    component: SlStoreDetailsComponent,
    resolve: {
      data: SlStoreResolveService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(SlStoreRoute)],
  exports: [RouterModule],
})
export class SlStoreRoutingModule {}
