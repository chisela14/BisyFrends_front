import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  {
    path: 'home', //hace falta?
    loadChildren: ()=> import('./home/home.module').then(m => m.HomeModule) 
  },
  {
    path: '',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'schedule',
    canActivate: [AuthGuardService],
    loadChildren: ()=> import('./calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'groups',
    canActivate: [AuthGuardService],
    loadChildren: ()=> import('./group/group.module').then(m => m.GroupModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuardService],
    loadChildren: ()=> import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
