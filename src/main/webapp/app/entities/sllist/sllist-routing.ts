import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlItem } from 'src/main/webapp/app/entities/slitem/slitem-model'
import { SlList } from 'src/main/webapp/app/entities/sllist/sllist-model'
import { SlListDetailsComponent } from 'src/main/webapp/app/entities/sllist/edit/sllist-edit.component'
import { SlListListComponent } from 'src/main/webapp/app/entities/sllist/list/sllist-list.component'
import { SlListService } from 'src/main/webapp/app/entities/sllist/sllist-service'
import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { CrudResolveService } from 'src/main/webapp/app/core/crud/crud.resolver'


@Injectable({
  providedIn: 'root'
})
export class SlListResolveService extends CrudResolveService<SlList> {
  constructor(protected override service: SlListService) {
    super(service);
  }

  protected createNew(): SlList {
    const result = new SlList();

    result.store = new SlStore();
    return result;
  }

}
const SlListRoute: Routes = [
  {
    path: ':storeId',
    component: SlListListComponent,
  },
  {
    path: 'view/:id',
    component: SlListDetailsComponent,
    resolve: {
      data: SlListResolveService,
    },
  },
  {
    path: 'edit/:id',
    component: SlListDetailsComponent,
    resolve: {
      data: SlListResolveService,
    },
  },
  {
    path: 'new/:storeId',
    component: SlListDetailsComponent,
    resolve: {
      data: SlListResolveService,
    },
  },
  {
    path: 'copy/:id',
    component: SlListDetailsComponent,
    resolve: {
      data: SlListResolveService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(SlListRoute)],
  exports: [RouterModule],
})
export class SlListRoutingModule {}
