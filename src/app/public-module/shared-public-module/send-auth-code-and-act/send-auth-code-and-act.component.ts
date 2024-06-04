import { ActivationRequestDto } from "../__dto/activation-request.dto";
import { NewPasswordRequestDto } from "../__dto/new-password-request.dto";
import { Component, Input, OnInit } from "@angular/core";
import { ChangePasswordRequestDto } from "../__dto/change-password-request.dto";
import { PublicUserService } from "../../__services/public-user.service";
import { TokenService } from "../../../core-module/token.service";
import { Router } from "@angular/router";
import { SignInResponseDto } from "../__dto/sign-in-response.dto";
import { AuthenticationByMailSteps } from "../__enums/authentication-by-mail.enum";
import { catchError, throwError } from "rxjs";
import { AuthenticationByMailService } from "../__services/authentication-by-mail.service";

@Component({
  selector: "app-send-auth-code-and-act",
  templateUrl: "./send-auth-code-and-act.component.html",
  styleUrls: ["./../../../shared-module/general-styles.css"],
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
  activationRequestDto!: ActivationRequestDto;
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

  activateUserResponseBody!: string;
  activateUserResponseStatus!: number;
  activateUserResponseMsgToDisplay!: string;
  activateUser_success!: boolean;

  askedChangePassword: boolean = false;
 

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    public authenticationByMailService: AuthenticationByMailService,
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

    this.authenticationByMailService.setCurrentStep(
      AuthenticationByMailSteps.SEND_AUTH_CODE
    );
  }

  onSendAuthCode() {
    this.activationRequestDto = {
      code: this.activationcode,
    };

    this.publicUserservice
      .activateUser(this.activationRequestDto)
      .pipe(
        catchError((error) => {
          this.activateUserResponseStatus = error.status;
          this.activateUserResponseBody = error.error.detail;
          this.activateUser_success = false;
          this.activateUserResponseMsgToDisplay =
            "La requête d'activation de l'utilisateur a échoué";
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.activateUserResponseStatus = response.status;
        if (response.status === 200 && response.body !== null) {
          this.activateUser_success = true;
          this.activateUserResponseMsgToDisplay =
            "Authentification réussie";
          this.authenticationByMailService.setCurrentStep(
            AuthenticationByMailSteps.OPERATION_RESULT_STATUS
          );
        } else {
          this.activateUser_success = false;
          this.activateUserResponseMsgToDisplay =
            "La requête d'activation de l'utilisateur a échoué";
          throw new Error("Request to change password failed");
        }
      });
  }

  onSendNewPassword() {
    this.newPasswordRequestDto = {
      code: this.activationcode,
      email: this.emailWhereCodeSended,
      password: this.confirmedPassword,
    };

    this.publicUserservice
      .sendNewPassword(this.newPasswordRequestDto)
      .pipe(
        catchError((error) => {
          this.newPasswordResponseStatus = error.status;
          this.newPasswordResponseBody = error.error.detail;
          this.newPassword_success = false;
          this.newPasswordResponseMsgToDisplay =
            "La requête de changement de mot de passe a échoué";
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.newPasswordResponseStatus = response.status;
        if (response.status === 200 && response.body !== null) {
          this.newPassword_success = true;
          this.newPasswordResponseMsgToDisplay =
            "Changement du mot de passe effectué.";
          this.authenticationByMailService.setCurrentStep(
            AuthenticationByMailSteps.OPERATION_RESULT_STATUS
          );
        } else {
          this.newPassword_success = false;
          this.newPasswordResponseMsgToDisplay =
            "La requête de changement de mot de passe a échoué";
          throw new Error("Request to change password failed");
        }
      });
  }
}
