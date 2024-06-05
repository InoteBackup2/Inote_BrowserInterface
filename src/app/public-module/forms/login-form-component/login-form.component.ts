import { LanguageManagerService } from "./../../../shared-module/services/language-manager.service";
import { SignInResponseDto } from "../../shared-public-module/dtos/sign-in-response.dto";
import { SignInRequestDto } from "../../shared-public-module/dtos/sign-in-request.dto";
import { Component } from "@angular/core";
import { PublicUserService } from "../../services/public-user.service";
import { Router } from "@angular/router";
import { TokenService } from "../../../core-module/services/token.service";
import { ChangePasswordRequestDto } from "../../shared-public-module/dtos/change-password-request.dto";
import { AuthenticationByMailSteps } from "../../shared-public-module/enums/authentication-by-mail.enum";
import { AuthenticationByMailService } from "../../shared-public-module/services/authentication-by-mail.service";
import { HttpStatusCode } from "@angular/common/http";
import { Urn } from "../../../shared-module/enums/urn.enum";
import { ToastrService } from "ngx-toastr";
import { Msg } from "../../../shared-module/constants/messages.constant";
import { AppProperties } from "../../../app.properties";
import { ErrorResponseDto } from "../../../shared-module/dtos/error-response.dto";

@Component({
  selector: "app-login-form-component",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css", "../../../../styles.css"],
})
export class LoginFormComponent {
  // RELATING TEMPLATE VARIABLES
  // ==============================================
  emailPath:string=Msg.signInForm.EMAIL;
  pwdPath:string=Msg.signInForm.PASSWORD;
  forgottenPwd:string=Msg.signInForm.FORGOTTEN_PASSWORD;
  signIn:string=Msg.signInForm.SIGN_IN;
  
  
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
    private authenticationByMailService: AuthenticationByMailService,
    private publicUserservice: PublicUserService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
    public lang: LanguageManagerService
  ) {}

  // INITIALIZATION (by ngOnInit)
  // ==============================================

  // TEMPLATE CALLBACKS METHODS
  // ==============================================
  OnSubmit() {
    const signInRequestDto: SignInRequestDto = {
      username: this.email,
      password: this.password,
    };

    this.publicUserservice.loginUser(signInRequestDto).subscribe(
      (response) => {
        if (response.status === HttpStatusCode.Ok && response.body!== null) {
          this.signInResponseDto = response.body;
          this.tokenService.saveToken(this.signInResponseDto.bearer);
          this.router.navigate([Urn.DASHBOARD]);
        } else {
          this.toastr.error(
            this.lang.pickMsg(Msg.auth.errors.USER_LOGIN_FAILED),
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            { timeOut: AppProperties.TOASTER_TIMEOUT }
          );
        }
      },

      (error) => {
        this.errorResponseDto = JSON.parse(error.error);
        this.toastr.error(
          this.errorResponseDto.detail,
          this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
          { timeOut: AppProperties.TOASTER_TIMEOUT }
        );
      }
    );
  }

  onChangePasswordAsked() {
    this.changePasswordRequestBody = {
      email: this.email,
    };

    this.publicUserservice
      .askChangePassword(this.changePasswordRequestBody)
      .subscribe(
        (response) => {
          this.askedChangePassword = true;
          if (response.status === HttpStatusCode.Ok) {
            this.changePassword_success = true;
          } else {
            this.toastr.error(
              this.lang.pickMsg(Msg.auth.errors.CHANGE_PASSWORD_FAILED),
              this.lang.pickMsg(
                Msg.toasts.errors.titles.DETECTED_ANOMALY
              ),
              { timeOut: AppProperties.TOASTER_TIMEOUT }
            );
          }
        },
        (error) => {
          this.errorResponseDto = JSON.parse(error.error);
          this.toastr.error(
            this.errorResponseDto.detail,
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            { timeOut: AppProperties.TOASTER_TIMEOUT }
          );
        }
      );
  }

  onCloseNewPasswordModal() {
    this.authenticationByMailService.setCurrentStep(
      AuthenticationByMailSteps.INIT
    );
  }

  onForgottenPassword() {
    this.authenticationByMailService.setCurrentStep(
      AuthenticationByMailSteps.REQUEST_AUTH_CODE
    );
  }
}
