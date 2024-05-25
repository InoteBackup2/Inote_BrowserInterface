import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core-module/auth.guard';
import { ViewUserEditComponent } from './view-user-edit/view-user-edit.component';
import { ViewUserDetailsComponent } from './view-user-details/view-user-details.component';
import { ViewUserAddComponent } from './view-user-add/view-user-add.component';
import { ViewUserListComponent } from './view-user-list/view-user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const protectedRoutes: Routes = [
    {
        path:'edit/user/:id',
        component: ViewUserEditComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'user/add',
        component:ViewUserAddComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'user/:id',
        component: ViewUserDetailsComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'users',
        component:ViewUserListComponent,
        canActivate:[AuthGuard]
    },
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
