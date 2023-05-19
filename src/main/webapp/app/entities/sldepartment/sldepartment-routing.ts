import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'
import { SlDepartmentDetailsComponent } from 'src/main/webapp/app/entities/sldepartment/edit/sldepartment-edit.component'
import { SlDepartmentListComponent } from 'src/main/webapp/app/entities/sldepartment/list/sldepartment-list.component'
import { SlDepartmentService } from 'src/main/webapp/app/entities/sldepartment/sldepartment-service'
import { SlItem } from 'src/main/webapp/app/entities/slitem/slitem-model'
import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'
import { CrudResolveService } from 'src/main/webapp/app/core/crud/crud.resolver'


@Injectable({
  providedIn: 'root'
})
export class SlDepartmentResolveService extends CrudResolveService<SlDepartment> {
  constructor(protected override service: SlDepartmentService) {
    super(service);
  }

  protected createNew(): SlDepartment {
    const result = new SlDepartment();

    result.store = new SlStore();
    return result;
  }

}
const SlDepartmentRoute: Routes = [
  {
    path: '',
    component: SlDepartmentListComponent,
  },
  {
    path: 'view/:id',
    component: SlDepartmentDetailsComponent,
    resolve: {
      data: SlDepartmentResolveService,
    },
  },
  {
    path: 'edit/:id',
    component: SlDepartmentDetailsComponent,
    resolve: {
      data: SlDepartmentResolveService,
    },
  },
  {
    path: 'new/:parentId',
    component: SlDepartmentDetailsComponent,
    resolve: {
      data: SlDepartmentResolveService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(SlDepartmentRoute)],
  exports: [RouterModule],
})
export class SlDepartmentRoutingModule {}
