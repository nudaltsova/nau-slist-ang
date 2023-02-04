import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
            {
        path: 'users',
        loadChildren: () => import('./sluser/sluser-module').then(m => m.SlUserModule),
      },
      {
        path: 'groups',
        loadChildren: () => import('./slgroup/slgroup-module').then(m => m.SlGroupModule),
      },
      {
        path: 'usergroups',
        loadChildren: () => import('./slusergroup/slusergroup-module').then(m => m.SlUserGroupModule),
      },
      {
        path: 'stores',
        loadChildren: () => import('./slstore/slstore-module').then(m => m.SlStoreModule),
      },
      {
        path: 'departments',
        loadChildren: () => import('./sldepartment/sldepartment-module').then(m => m.SlDepartmentModule),
      },
      {
        path: 'items',
        loadChildren: () => import('./slitem/slitem-module').then(m => m.SlItemModule),
      },
      {
        path: 'lists',
        loadChildren: () => import('./sllist/sllist-module').then(m => m.SlListModule),
      },
    ]),
  ],
})

export class EntityRoutingModule {
}
