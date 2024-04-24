import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { LandingPageComponentComponent } from './landing-page-component/landing-page-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { SharedPublicModuleModule } from './shared-public-module/shared-public-module.module';
import { SubscribeComponentComponent } from './subscribe-component/subscribe-component.component';

const publicRoutes:Routes = [
  {path:'home', component:LandingPageComponentComponent},
  {path:'login', component:LoginComponentComponent},
  {path:'page-not-found', component:PageNotFoundComponentComponent},
  {path:'subscribe', component:SubscribeComponentComponent}
]

@NgModule({
  declarations: [
    LandingPageComponentComponent,
    LoginComponentComponent,
    PageNotFoundComponentComponent,
    SubscribeComponentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(publicRoutes),
    SharedPublicModuleModule,
    SharedModuleModule,
    FormsModule,
  ]
})
export class PublicModuleModule { }
