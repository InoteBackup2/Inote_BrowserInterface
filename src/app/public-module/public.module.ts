import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';
import { FormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { LandingPageComponent } from './__functionnalities/landing-page/landing-page.component';
import { LoginComponent } from './__functionnalities/login/login.component';
import { PageNotFoundComponent } from './__functionnalities/page-not-found/page-not-found.component';
import { SharedPublicModule } from './shared-public-module/shared-public.module';

import { RegisterFormComponent } from './__forms/register-form/register-form.component';
import { ProtectedUserService } from '../protected-module/shared-protected-module/user-module/protected-user.service';
import { LoginFormComponent } from './__forms/login-form/login-form.component';
import { RegisterComponent } from './__functionnalities/register/register.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginFormComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterFormComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PublicRoutingModule,
    SharedPublicModule
  ],
  providers:[
    ProtectedUserService,
  ]
})
export class PublicModule { }
