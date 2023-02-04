import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlGroup } from 'src/main/webapp/app/entities/slgroup/slgroup-model'
import { SlUser } from 'src/main/webapp/app/entities/sluser/sluser-model'
import { SlUserGroup } from 'src/main/webapp/app/entities/slusergroup/slusergroup-model'
import { SlUserGroupDetailsComponent } from 'src/main/webapp/app/entities/slusergroup/edit/slusergroup-edit.component'
import { SlUserGroupListComponent } from 'src/main/webapp/app/entities/slusergroup/list/slusergroup-list.component'
import { SlUserGroupService } from 'src/main/webapp/app/entities/slusergroup/slusergroup-service'
import { CrudResolveService } from 'src/main/webapp/app/core/crud/crud.resolver'


@Injectable({
  providedIn: 'root'
})
export class SlUserGroupResolveService extends CrudResolveService<SlUserGroup> {
  constructor(protected override service: SlUserGroupService) {
    super(service);
  }

  protected createNew(): SlUserGroup {
    const result = new SlUserGroup();

    result.user = new SlUser();
    result.group = new SlGroup();
    return result;
  }

}
const SlUserGroupRoute: Routes = [
  {
    path: '',
    component: SlUserGroupListComponent,
  },
  {
    path: 'view/:id',
    component: SlUserGroupDetailsComponent,
    resolve: {
      data: SlUserGroupResolveService,
    },
  },
  {
    path: 'edit/:id',
    component: SlUserGroupDetailsComponent,
    resolve: {
      data: SlUserGroupResolveService,
    },
  },
  {
    path: 'new',
    component: SlUserGroupDetailsComponent,
    resolve: {
      data: SlUserGroupResolveService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(SlUserGroupRoute)],
  exports: [RouterModule],
})
export class SlUserGroupRoutingModule {}
