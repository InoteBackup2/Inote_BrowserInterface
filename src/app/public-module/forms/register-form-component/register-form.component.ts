import { ErrorResponseDto } from "../../../shared-module/dtos/error-response.dto";
import { Component, ViewChild } from "@angular/core";
import type { RegisterRequestDto } from "../../shared-public-module/dtos/register-request.dto";
import { PublicUserService } from "../../services/public-user.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpStatusCode } from "@angular/common/http";
import { ModalActivateUserComponent } from "../../shared-public-module/modals/modal-activate-user-component/modal-activate-user.component";
import { Msg } from "../../../shared-module/constants/messages.constant";
import { LanguageManagerService } from "../../../shared-module/services/language-manager.service";
import { AppProperties } from "../../../app.properties";
import { Urn } from "../../../shared-module/enums/urn.enum";

@Component({
  selector: "app-register-form-component",
  templateUrl: "./register-form.component.html",
  styleUrls: [
    "./register-form.component.css",
    "../../../../styles.css",
  ],
})
export class RegisterFormComponent {
  // RELATING TEMPLATE VARIABLES
  // ==============================================

  // @ViewChild retrieves a reference to one of the component's child elements, and provides access to its methods
  @ViewChild(ModalActivateUserComponent) modal!: ModalActivateUserComponent;

  pseudoPath:string=Msg.registerForm.PSEUDO;
  emailPath:string=Msg.registerForm.EMAIL;
  pwdPath:string=Msg.registerForm.PASSWORD;
  

  username!: string;
  password!: string;
  pseudonyme!: string;
  activation_success: boolean = false;
 
  // HTTP
  // ==============================================
  /* Request */
  registerRequestBody!: RegisterRequestDto;
  
  /* Response */
  errorResponseDto!: ErrorResponseDto;

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================

  constructor(
    private publicUserService: PublicUserService,
    private router: Router,
    private toastr: ToastrService,
    public lang: LanguageManagerService
  ) {}

  // INITIALIZATION (by ngOnInit)
  // ==============================================

  // TEMPLATE CALLBACKS METHODS
  // ==============================================
  actOnSuccessEmitedByChild(value: string) {
    if (value === "activation success") {
      this.closeModal();
      this.activation_success = true;
    }
  }

  openModal() {
    this.modal.openModal(
      this.lang.pickMsg(Msg.toasts.titles.USER_ACCOUNT_ACTIVATION),
      this.lang.pickMsg(Msg.toasts.prompts.ENTER_ACTIVATION_CODE_SENT_BY_MAIL));
  }

  closeModal() {
    this.modal.closeModal();
  }

  /**
   * Register a new user account
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onSubmitRegister() {
    this.closeModal();

    this.registerRequestBody = {
      pseudo: this.pseudonyme,
      username: this.username,
      password: this.password,
    };

    this.publicUserService.addUser(this.registerRequestBody).subscribe(
      (response) => {
        if (response.status === HttpStatusCode.Created) {
          this.openModal();
        } else {
          this.toastr.warning(this.lang.pickMsg(Msg.toasts.errors.titles.REQUEST_HAS_FAILED),
          this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            {timeOut: AppProperties.TOASTER_TIMEOUT}
          );
        }
      },

      (error) => {
        this.errorResponseDto = JSON.parse(error.error);
        this.toastr.error(this.errorResponseDto.detail,
          this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
          { timeOut: AppProperties.TOASTER_TIMEOUT});
      }
    );
  }

  // NAVIGATION
  // ==============================================
  onGoToHome() {
    this.router.navigate([Urn.HOME]);
  }

  onLogin() {
    this.router.navigate([Urn.SIGN_IN]);
  }
}
