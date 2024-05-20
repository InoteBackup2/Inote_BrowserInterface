import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedPublicModule } from './shared-public/shared-public-module.module';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserService } from '../protected/shared-protected/user/user.service';
import { LoginFormComponent } from './login-form/login-form.component';
const publicRoutes:Routes = [
  {path:'home', component:LandingPageComponent},
  {path:'login', component:LoginComponent},
  {path:'page-not-found', component:PageNotFoundComponent},
  {path:'subscribe', component:SubscribeComponent}
]

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginComponent,
    PageNotFoundComponent,
    SubscribeComponent,
    RegisterFormComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(publicRoutes),
    SharedPublicModule,
  ],
  
    providers:[
      UserService,
    ]
  
})
export class PublicModule { }
