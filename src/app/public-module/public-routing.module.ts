import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './__functionnalities/landing-page/landing-page.component';
import { LoginComponent } from './__functionnalities/login/login.component';
import { PageNotFoundComponent } from './__functionnalities/page-not-found/page-not-found.component';
import { RegisterComponent } from './__functionnalities/register/register.component';

const publicRoutes: Routes = [
    {path:'home', component:LandingPageComponent},
    {path:'login', component:LoginComponent},
    {path:'page-not-found', component:PageNotFoundComponent},
    {path:'register', component:RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forChild(publicRoutes)],
    exports: [RouterModule]
})
export class PublicRoutingModule { }
  