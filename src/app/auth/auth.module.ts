import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HomeModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent
  ]
})
export class AuthModule { }
