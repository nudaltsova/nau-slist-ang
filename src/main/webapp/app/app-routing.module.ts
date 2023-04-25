import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MsalGuard } from '@azure/msal-angular';
import { environment } from '../environments/environment';

const authGuard = environment.auth_required ?  [MsalGuard] : [];

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: authGuard },
  {
    path: '',
    loadChildren: () => import('./entities/domain-routing').then(m => m.EntityRoutingModule),
    canActivate: authGuard
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }