import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core-module/auth.guard";
import { DashboardComponent } from "./dashboard-component/dashboard.component";
import { Urn } from "../shared-module/enums/urn.enum";
import { UserManagementComponent } from "./user-management-component/user-management.component";
import { AuthAdminGuard } from "../core-module/auth-admin.guard";




const protectedRoutes: Routes = [
  {
    path: Urn.DASHBOARD,
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Urn.USERS_MANAGEMENT,
    component: UserManagementComponent,
    canActivate: [AuthAdminGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(protectedRoutes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
