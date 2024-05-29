import { EngineStepService } from '../shared-public-module/engine-step.service';
import { SignInResponseDto } from "./../shared-public-module/dto/sign-in-response.dto";
import { SignInRequestDto } from "./../shared-public-module/dto/sign-in-request.dto";
import { Component } from "@angular/core";
import { PublicUserService } from "../public-user.service";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { TokenService } from "../../core-module/token.service";
import { ChangePasswordRequestDto } from "../shared-public-module/dto/change-password-request.dto";
import { Steps } from '../shared-public-module/steps.enum';


@Component({
  selector: "app-login-form-component",
  templateUrl: "./login-form.component.html",
  styleUrls: [
    "./login-form.component.css",
    "../../shared-module/general-styles.css",
  ],
})
export class LoginFormComponent {
onCloseNewPasswordModal() {
  this.engineStepService.setCurrentStep(Steps.INIT);
}



onForgottenPassword() {
 this.engineStepService.setCurrentStep(Steps.REQUEST_AUTH_CODE);
 
}
  
  
    isModalShow = false;
  
    openModal() {
      this.isModalShow = true;
    }
  
    closeModal() {
      this.isModalShow = false;
    }
  


  
  
  confirmedPassword!: string;
  newPassword!: string;
  onSendNewPassword() {
    
  }

  OnSubmitChangePwdRequest() {
    throw new Error("Method not implemented.");
  }
  
  activationcode!: number;
  activation_success!: boolean;
  activationResponseStatus!: number;
  activationResponseMsgToDisplay!: string;
  registerResponseMsgToDisplay!: string;
  receivedActivationCode!: boolean;
  onSubmitActivation() {
    throw new Error("Method not implemented.");
  }
  // RELATING TEMPLATE VARIABLES
  // ==============================================

  email!: string;
  password!: string;
  statusAfterRequest!: number;
  msgAfterRequest!: string;
  askedChangePassword: boolean = false;
  isModalOpen = false;
  receveidCode: boolean = false;
  authenticatedCode: boolean = false;

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

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    private engineStepService:EngineStepService,
    private publicUserservice: PublicUserService,
    private tokenService: TokenService,
    private router: Router
  ) {}


  

  // INITIALIZATION (by ngOnInit)
  // ==============================================

  // TEMPLATE CALLBACKS METHODS
  // ==============================================
  OnSubmit() {
    console.log("1111");
    const signInRequestDto: SignInRequestDto = {
      username: this.email,
      password: this.password,
    };

    this.publicUserservice
      .loginUser(signInRequestDto)
      .pipe(
        catchError((error) => {
          this.changePasswordResponseStatus = error.status;
          this.changePasswordResponseBody = error.error.detail;
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.changePasswordResponseStatus = response.status;
        if (response.status === 200 && response.body !== null) {
          this.signInResponseDto = response.body;
          this.tokenService.saveToken(this.signInResponseDto.bearer);
          this.router.navigate(["dashboard"]);
        }
      });
  }

  onChangePasswordAsked() {
    this.changePasswordRequestBody = {
      email: this.email,
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
            "HTTP Response anomaly : body is empty or status code not attempted"
          );
        }
      });
  }

  onAskingReceiveCode() {
   
  }

  OnSubmit2() {
    console.log("aaaaaa");
    this.activation_success = true;
  }

  onSendActivationCode() {
   
  }
}
