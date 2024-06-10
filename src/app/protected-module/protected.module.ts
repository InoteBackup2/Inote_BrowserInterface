import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedProtectedModule } from './shared-protected-module/shared-protected.module';
import { ProtectedRoutingModule } from './protected-routing.module';
import { UserModule } from './shared-protected-module/user-module/user.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { UserManagementComponent } from './user-management-component/user-management.component';

@NgModule({
    declarations: [
        DashboardComponent,
        UserManagementComponent
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
