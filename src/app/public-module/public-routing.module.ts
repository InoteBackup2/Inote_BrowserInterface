import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page-component/landing-page.component';
import { LoginComponent } from './login-component/login.component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found.component';
import { RegisterComponent } from './register-component/register.component';
import { Urn } from '../shared-module/enums/urn.enum';

const publicRoutes: Routes = [
    {path:Urn.HOME, component:LandingPageComponent},
    {path:Urn.SIGN_IN, component:LoginComponent},
    {path:Urn.REGISTER, component:RegisterComponent},
    {path:Urn.DASHBOARD, component:RegisterComponent},
    {path:Urn.PAGE_NOT_FOUND, component:PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forChild(publicRoutes)],
    exports: [RouterModule]
})
export class PublicRoutingModule { }
  