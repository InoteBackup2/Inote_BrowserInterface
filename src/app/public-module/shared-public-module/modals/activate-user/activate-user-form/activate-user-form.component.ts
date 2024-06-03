
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { TokenService } from "../../../../../core-module/token.service";
import { PublicUserService } from "../../../../public-user.service";
import { ActivationRequestDto } from "../../../dto/activation-request.dto";
import { ChangePasswordRequestDto } from "../../../dto/change-password-request.dto";
import { NewPasswordRequestDto } from "../../../dto/new-password-request.dto";
import { SignInResponseDto } from "../../../dto/sign-in-response.dto";
import { ActivateUserManagerService } from "../activate-user-manager.service";
import { ActivateUserStepsEnum } from "../activate-user-steps.enum";

@Component({
  selector: "app-activate-user-form",
  templateUrl: "./activate-user-form.component.html",
  styleUrls: ["./../../../../../shared-module/general-styles.css"]
})
export class ActivateUserFormComponent implements OnInit {

  // RELATING TEMPLATE VARIABLES
  // ==============================================
  @Input() emailWhereCodeSended!: string;
  @Input() errorMsg!: string;
  
  @Input()
  isReady!:boolean;

  @Input()
  step!: ActivateUserStepsEnum;
  
  activationcode!: string;
  email!: string;
  error!:string|null;
  inProgress!:boolean;

 

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
    public activateUserManagerService: ActivateUserManagerService,
    private publicUserservice: PublicUserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.emailWhereCodeSended;
    this.activationcode="";
    this.inProgress = false;
  }

  // INITIALIZATION (by ngOnInit)
  // ==============================================

  // TEMPLATE CALLBACKS METHODS
  // ==============================================
  onSendAuthCode() {
   
    
    this.activationRequestDto = {
      code: this.activationcode,
    };

    this.publicUserservice
      .activateUser(this.activationRequestDto)
      .pipe(
        catchError((error) => {
          this.inProgress=false;
          this.activationcode="";
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
          this.activateUserResponseMsgToDisplay = "Activation du compte OK";
          this.activateUserManagerService.setCurrentStep(
            ActivateUserStepsEnum.OPERATION_RESULT_STATUS
          );
          this.activationcode="";
          this.inProgress=false;
        } else {
          
          this.activationcode="";
          this.activateUser_success = false;
          this.inProgress=false;
          this.activateUserResponseMsgToDisplay =
            "La requête d'activation du cnouveau compte utilisateur a échoué";
          throw new Error("Request to change password failed");
        }
      });
  }
  onLogin() {
    this.router.navigate(["login"]);
    }
}
