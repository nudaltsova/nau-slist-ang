import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlUser } from 'src/main/webapp/app/entities/sluser/sluser-model'
import { SlUserDetailsComponent } from 'src/main/webapp/app/entities/sluser/edit/sluser-edit.component'
import { SlUserListComponent } from 'src/main/webapp/app/entities/sluser/list/sluser-list.component'
import { SlUserService } from 'src/main/webapp/app/entities/sluser/sluser-service'
import { CrudResolveService } from 'src/main/webapp/app/core/crud/crud.resolver'


@Injectable({
  providedIn: 'root'
})
export class SlUserResolveService extends CrudResolveService<SlUser> {
  constructor(protected override service: SlUserService) {
    super(service);
  }

  protected createNew(): SlUser {
    const result = new SlUser();

    return result;
  }

}
const SlUserRoute: Routes = [
  {
    path: '',
    component: SlUserListComponent,
  },
  {
    path: 'view/:id',
    component: SlUserDetailsComponent,
    resolve: {
      data: SlUserResolveService,
    },
  },
  {
    path: 'edit/:id',
    component: SlUserDetailsComponent,
    resolve: {
      data: SlUserResolveService,
    },
  },
  {
    path: 'new',
    component: SlUserDetailsComponent,
    resolve: {
      data: SlUserResolveService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(SlUserRoute)],
  exports: [RouterModule],
})
export class SlUserRoutingModule {}
