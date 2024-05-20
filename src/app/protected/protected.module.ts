import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserListComponent } from './view-user-list/view-user-list.component';
import { SharedProtectedModule } from './shared-protected/shared-protected.module';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './shared-protected/user/user.module';
import { ViewUserDetailsComponent } from './view-user-details/view-user-details.component';
import { ViewUserEditComponent } from './view-user-edit/view-user-edit.component';
import { ViewUserAddComponent } from './view-user-add/view-user-add.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../core/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { SharedModule } from '../shared-module/shared.module';



const protectedRoutes:Routes=[
  {path:'edit/user/:id', component: ViewUserEditComponent, canActivate:[AuthGuard]},
  {path:'user/add', component:ViewUserAddComponent , canActivate:[AuthGuard]},
  {path:'user/:id', component: ViewUserDetailsComponent, canActivate:[AuthGuard]},
  {path:'users', component:ViewUserListComponent, canActivate:[AuthGuard]},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  
  
  
]
@NgModule({
    declarations: [
        ViewUserListComponent,
        ViewUserDetailsComponent,
        ViewUserEditComponent,
        ViewUserAddComponent,
        DashboardComponent,
       
        
    ],
    imports: [
        CommonModule,
        SharedProtectedModule,
        RouterModule.forChild(protectedRoutes),
        FormsModule,
        UserModule
    ]
})
export class ProtectedModule { }
