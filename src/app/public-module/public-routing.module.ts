import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

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
  