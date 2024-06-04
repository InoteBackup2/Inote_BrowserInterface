import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PublicNavBarComponent } from "./public-nav-bar/public-nav-bar.component";
import { PublicUserService } from "../public-user.service";
import { BackEndPoints } from "./back-end-points.enum";
import { RouterModule } from "@angular/router";
import { SendAuthCodeAndActComponent } from "./send-auth-code-and-act/send-auth-code-and-act.component";
import { ModalActivateUserComponent } from "./modals/modal-activate-user/modal-activate-user.component";

@NgModule({
  declarations: [
    PublicNavBarComponent,
    SendAuthCodeAndActComponent,
    ModalActivateUserComponent,
  ],
  imports: [RouterModule, CommonModule, FormsModule],
  providers: [
    PublicUserService,
    { provide: "BackendEndPoints", useValue: BackEndPoints },
  ],
  exports: [
    PublicNavBarComponent,
    SendAuthCodeAndActComponent,
    ModalActivateUserComponent,
  ],
})
export class SharedPublicModule {}
