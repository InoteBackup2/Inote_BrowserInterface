import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';
import { FormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedPublicModule } from './shared-public-module/shared-public-module.module';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserService } from '../protected-module/shared-protected-module/userModule/user.service';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginComponent,
    PageNotFoundComponent,
    SubscribeComponent,
    RegisterFormComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PublicRoutingModule,
    SharedPublicModule
  ],
  providers:[
    UserService,
  ]
})
export class PublicModule { }
