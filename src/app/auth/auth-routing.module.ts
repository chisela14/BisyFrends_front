import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { MainPageComponent } from '../home/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
          path:'login',
          component: LoginComponent
      },
      {
        path:'register',
        component: RegisterComponent
      },
      {
        path:'verify',
        component: VerifyComponent
      },
      {
        path:'',
        component: MainPageComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
