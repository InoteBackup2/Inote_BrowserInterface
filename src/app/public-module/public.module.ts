import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';
import { FormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { LandingPageComponent } from './landing-page-component/landing-page.component';
import { LoginComponent } from './login-component/login.component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found.component';
import { SharedPublicModule } from './shared-public-module/shared-public.module';
import { RegisterFormComponent } from './forms/register-form-component/register-form.component';
import { ProtectedUserService } from '../protected-module/shared-protected-module/user-module/protected-user.service';
import { LoginFormComponent } from './forms/login-form-component/login-form.component';
import { RegisterComponent } from './register-component/register.component';

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
