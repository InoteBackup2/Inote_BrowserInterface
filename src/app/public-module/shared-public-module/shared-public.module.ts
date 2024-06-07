import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PublicNavBarComponent } from "./public-nav-bar-component/public-nav-bar.component";
import { PublicUserService } from "../services/public-user.service";
import { RouterModule } from "@angular/router";
import { SendAuthCodeAndActComponent } from "./send-auth-code-and-act-component/send-auth-code-and-act.component";
import { ModalActivateUserComponent } from "./modals/modal-activate-user-component/modal-activate-user.component";
import { SharedModule } from "../../shared-module/shared.module";
import { ModalForgottenPasswordComponent } from './modals/modal-forgotten-password/modal-forgotten-password.component';

@NgModule({
    declarations: [
        PublicNavBarComponent,
        SendAuthCodeAndActComponent,
        ModalActivateUserComponent,
        ModalForgottenPasswordComponent,
    ],
    providers: [
        PublicUserService
    ],
    exports: [
        PublicNavBarComponent,
        SendAuthCodeAndActComponent,
        ModalActivateUserComponent,
    ],
    imports: [RouterModule, CommonModule, FormsModule, SharedModule]
})
export class SharedPublicModule {}
