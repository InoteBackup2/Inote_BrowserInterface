import { LanguageManagerService } from "./../../../shared-module/services/language-manager.service";
import { SignInResponseDto } from "../../shared-public-module/dtos/sign-in-response.dto";
import { SignInRequestDto } from "../../shared-public-module/dtos/sign-in-request.dto";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PublicUserService } from "../../services/public-user.service";
import { Router } from "@angular/router";
import { TokenService } from "../../../core-module/services/token.service";
import { ChangePasswordRequestDto } from "../../shared-public-module/dtos/change-password-request.dto";
import { HttpStatusCode } from "@angular/common/http";
import { Urn } from "../../../shared-module/enums/urn.enum";
import { ToastrService } from "ngx-toastr";
import { Msg } from "../../../shared-module/constants/messages.constant";
import { environment as env } from "../../../../environments/environment";
import { ErrorResponseDto } from "../../../shared-module/dtos/error-response.dto";
import { ModalForgottenPasswordComponent } from "../../shared-public-module/modals/modal-forgotten-password/modal-forgotten-password.component";

@Component({
  selector: "app-login-form-component",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css", "../../../../styles.css"],
})
export class LoginFormComponent implements OnInit{
  // RELATING TEMPLATE VARIABLES
  // ==============================================
  // @ViewChild retrieves a reference to one of the component's child elements, and provides access to its methods
  @ViewChild(ModalForgottenPasswordComponent)
  modalForgottenPassword!: ModalForgottenPasswordComponent;

  emailPath: string = Msg.webpage_staticText.signInForm.EMAIL;
  pwdPath: string = Msg.webpage_staticText.signInForm.PASSWORD;
  forgottenPwd: string = Msg.webpage_staticText.signInForm.FORGOTTEN_PASSWORD;
  signIn: string = Msg.webpage_staticText.signInForm.SIGN_IN;

  email!: string;
  password!: string;
  askedChangePassword!: boolean;
  
  // HTTP
  // ==============================================
  /* Request */
  changePasswordRequestBody!: ChangePasswordRequestDto;

  /* Response */
  signInResponseDto!: SignInResponseDto;

  changePasswordResponseBody!: string | null;
  changePasswordResponseStatus!: number;
  changePasswordResponseMsgToDisplay!: string | null;
  changePassword_success: boolean = false;
  errorResponseDto!: ErrorResponseDto;

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    private publicUserservice: PublicUserService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
    public lang: LanguageManagerService
  ) {}
  
  // INITIALIZATION (by ngOnInit)
  // ==============================================
  ngOnInit(): void {
    this.askedChangePassword === false;
  }

  // TEMPLATE CALLBACKS METHODS
  // ==============================================
  actOnSuccessEmitedByChild(value: string) {
    if (value === "activation success") {
      this.closeForgottenPasswordModal();
     }
  }

  OnSubmit() {
    const signInRequestDto: SignInRequestDto = {
      username: this.email,
      password: this.password,
    };

    this.publicUserservice.loginUser(signInRequestDto).subscribe(
      (response) => {
        if (response.status === HttpStatusCode.Ok && response.body !== null) {
          this.signInResponseDto = response.body;
          this.tokenService.saveToken(this.signInResponseDto.bearer);
          this.tokenService.saveRefreshToken(this.signInResponseDto.refresh);
          this.router.navigate([Urn.DASHBOARD]);
        } else {
          this.toastr.error(
            this.lang.pickMsg(Msg.auth.errors.USER_LOGIN_FAILED),
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            { timeOut: env.TOASTER_TIMEOUT }
          );
        }
      },

      (error) => {
        this.errorResponseDto = error.error;
        this.toastr.error(
          this.errorResponseDto.detail,
          this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
          { timeOut: env.TOASTER_TIMEOUT }
        );
      }
    );
  }

  

  onForgottenPassword() {
   this.changePasswordRequestBody = {
      email: this.email,
    };

    this.publicUserservice
      .askChangePassword(this.changePasswordRequestBody)
      .subscribe(
        (response) => {
          this.askedChangePassword = true;
          if (response.status === HttpStatusCode.Ok) {
            this.openForgottenPasswordModal();
          } else {
            this.askedChangePassword = false;
            this.toastr.error(
              this.lang.pickMsg(Msg.auth.errors.CHANGE_PASSWORD_FAILED),
              this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
              { timeOut: env.TOASTER_TIMEOUT }
            );
          }
        },
        (error) => {
          this.askedChangePassword = false;
          this.errorResponseDto = JSON.parse(error.error);
          this.toastr.error(
            this.errorResponseDto.detail,
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            { timeOut: env.TOASTER_TIMEOUT }
          );
        }
      );
  }

  openForgottenPasswordModal() {
    this.modalForgottenPassword.openModal(
      this.lang.pickMsg(
        Msg.webpage_staticText.modal_change_password.CHANGE_PASSWORD
      ),
      this.lang.pickMsg(
        Msg.webpage_staticText.modal_change_password
          .AUTHENTICATION_CODE_NEEDED_ON_CHANGE_PASSWORD
      )
    );
  }

  closeForgottenPasswordModal() {
    this.modalForgottenPassword.closeModal();
  }
}
