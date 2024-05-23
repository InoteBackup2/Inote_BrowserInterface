import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserListComponent } from './view-user-list/view-user-list.component';
import { SharedProtectedModule } from './shared-protected/shared-protected.module';
import { ProtectedRoutingModule } from './protected-routing.module';
import { UserModule } from './shared-protected/user/user.module';
import { ViewUserDetailsComponent } from './view-user-details/view-user-details.component';
import { ViewUserEditComponent } from './view-user-edit/view-user-edit.component';
import { ViewUserAddComponent } from './view-user-add/view-user-add.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [
        ViewUserListComponent,
        ViewUserDetailsComponent,
        ViewUserEditComponent,
        ViewUserAddComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedProtectedModule,
        ProtectedRoutingModule,
        FormsModule,
        UserModule
    ]
})
export class ProtectedModule { }
