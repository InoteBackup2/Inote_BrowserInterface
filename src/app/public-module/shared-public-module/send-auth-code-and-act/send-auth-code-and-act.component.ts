import { NewPasswordRequestDto } from "./../dto/new-password-request.dto";
import { EngineStepService } from "./../engine-step.service";
import { Component, Input, OnInit } from "@angular/core";
import { ChangePasswordRequestDto } from "../dto/change-password-request.dto";
import { PublicUserService } from "../../public-user.service";
import { TokenService } from "../../../core-module/token.service";
import { Router } from "@angular/router";
import { SignInResponseDto } from "../dto/sign-in-response.dto";
import { Steps } from "../steps.enum";
import { catchError, throwError } from "rxjs";

@Component({
  selector: "app-send-auth-code-and-act",
  templateUrl: "./send-auth-code-and-act.component.html",
  styles: ``,
})
export class SendAuthCodeAndActComponent implements OnInit {
  // RELATING TEMPLATE VARIABLES
  // ==============================================
  @Input() emailWhereCodeSended!: string;
  confirmedPassword!: string;
  newPassword!: string;
  activationcode!: string;
  email!: string;

  // HTTP
  // ==============================================
  /* Request */
  changePasswordRequestBody!: ChangePasswordRequestDto;
  newPasswordRequestDto!: NewPasswordRequestDto;

  /* Response */
  signInResponseDto!: SignInResponseDto;

  changePasswordResponseBody!: string | null;
  changePasswordResponseStatus!: number;
  changePasswordResponseMsgToDisplay!: string | null;
  changePassword_success: boolean = false;

  newPasswordResponseBody!: string | null;
  newPasswordResponseStatus!: number;
  newPasswordResponseMsgToDisplay!: string | null;
  newPassword_success: boolean = false;

  

  askedChangePassword: boolean = false;

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    public engineStepService: EngineStepService,
    private publicUserservice: PublicUserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.emailWhereCodeSended;
  }

  // INITIALIZATION (by ngOnInit)
  // ==============================================

  // TEMPLATE CALLBACKS METHODS
  // ==============================================
  onAskingReceiveCode() {
    this.changePasswordRequestBody = {
      email: this.emailWhereCodeSended,
    };

    this.publicUserservice
      .askChangePassword(this.changePasswordRequestBody)
      .pipe(
        catchError((error) => {
          this.changePasswordResponseStatus = error.status;
          this.changePasswordResponseBody = error.error.detail;
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.askedChangePassword = true;
        this.changePasswordResponseStatus = response.status;
        if (response.status === 200 && response.body !== null) {
          this.changePassword_success = true;
        } else {
          throw new Error(
            "The HTTP request for an authentication code to change the password has failed."
          );
        }
      });

    this.engineStepService.setCurrentStep(Steps.SEND_NEW_PASSWORD);
  }

  onSendNewPassword() {
    this.newPasswordRequestDto = {
      "code": this.activationcode,
      "email": this.emailWhereCodeSended,
      "password": this.confirmedPassword
    };

    this.publicUserservice
      .sendNewPassword(this.newPasswordRequestDto)
      .pipe(
        catchError((error) => {
          this.newPasswordResponseStatus = error.status;
          this.newPasswordResponseBody = error.error.detail;
          this.newPassword_success = false;
          this.newPasswordResponseMsgToDisplay = "La requête de changement de mot de passe a échoué";
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.newPasswordResponseStatus = response.status;
        if (response.status === 200 && response.body !== null) {
          this.newPassword_success = true;
          this.newPasswordResponseMsgToDisplay = "Changement du mot de passe effectué."
          this.engineStepService.setCurrentStep(Steps.OPERATION_RESULT_STATUS);
          } else {
            this.newPassword_success = false;
          this.newPasswordResponseMsgToDisplay = "La requête de changement de mot de passe a échoué";
          throw new Error(
            "Request to change password failed"
          );
        }
      });
   
  }
}
