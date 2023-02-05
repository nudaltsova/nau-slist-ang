import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlGroup } from 'src/main/webapp/app/entities/slgroup/slgroup-model'
import { SlGroupDetailsComponent } from 'src/main/webapp/app/entities/slgroup/edit/slgroup-edit.component'
import { SlGroupListComponent } from 'src/main/webapp/app/entities/slgroup/list/slgroup-list.component'
import { SlGroupService } from 'src/main/webapp/app/entities/slgroup/slgroup-service'
import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { SlUserGroup } from 'src/main/webapp/app/entities/slusergroup/slusergroup-model'
import { CrudResolveService } from 'src/main/webapp/app/core/crud/crud.resolver'


@Injectable({
  providedIn: 'root'
})
export class SlGroupResolveService extends CrudResolveService<SlGroup> {
  constructor(protected override service: SlGroupService) {
    super(service);
  }

  protected createNew(): SlGroup {
    const result = new SlGroup();

    return result;
  }

}
const SlGroupRoute: Routes = [
  {
    path: '',
    component: SlGroupListComponent,
  },
  {
    path: 'view/:id',
    component: SlGroupDetailsComponent,
    resolve: {
      data: SlGroupResolveService,
    },
  },
  {
    path: 'edit/:id',
    component: SlGroupDetailsComponent,
    resolve: {
      data: SlGroupResolveService,
    },
  },
  {
    path: 'new',
    component: SlGroupDetailsComponent,
    resolve: {
      data: SlGroupResolveService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(SlGroupRoute)],
  exports: [RouterModule],
})
export class SlGroupRoutingModule {}
