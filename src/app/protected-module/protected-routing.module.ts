import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core-module/auth.guard";
import { DashboardComponent } from "./dashboard-component/dashboard.component";
import { Urn } from "../shared-module/enums/urn.enum";

const protectedRoutes: Routes = [
  {
    path: Urn.DASHBOARD,
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(protectedRoutes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
