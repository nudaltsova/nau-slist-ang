import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'
import { SlItem } from 'src/main/webapp/app/entities/slitem/slitem-model'
import { SlItemDetailsComponent } from 'src/main/webapp/app/entities/slitem/edit/slitem-edit.component'
import { SlItemListComponent } from 'src/main/webapp/app/entities/slitem/list/slitem-list.component'
import { SlItemService } from 'src/main/webapp/app/entities/slitem/slitem-service'
import { CrudResolveService } from 'src/main/webapp/app/core/crud/crud.resolver'


@Injectable({
  providedIn: 'root'
})
export class SlItemResolveService extends CrudResolveService<SlItem> {
  constructor(protected override service: SlItemService) {
    super(service);
  }

  protected createNew(): SlItem {
    const result = new SlItem();

    result.department = new SlDepartment();
    return result;
  }

}
const SlItemRoute: Routes = [
  {
    path: '',
    component: SlItemListComponent,
  },
  {
    path: 'view/:id',
    component: SlItemDetailsComponent,
    resolve: {
      data: SlItemResolveService,
    },
  },
  {
    path: 'edit/:id',
    component: SlItemDetailsComponent,
    resolve: {
      data: SlItemResolveService,
    },
  },
  {
    path: 'new/:parentId',
    component: SlItemDetailsComponent,
    resolve: {
      data: SlItemResolveService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(SlItemRoute)],
  exports: [RouterModule],
})
export class SlItemRoutingModule {}
