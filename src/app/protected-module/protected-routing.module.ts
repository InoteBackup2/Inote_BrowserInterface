import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core-module/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const protectedRoutes: Routes = [
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(protectedRoutes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
