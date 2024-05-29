import { EngineStepService } from './../engine-step.service';
import { Component, Input, OnInit } from "@angular/core";
import { ChangePasswordRequestDto } from "../dto/change-password-request.dto";
import { PublicUserService } from "../../public-user.service";
import { TokenService } from "../../../core-module/token.service";
import { Router } from "@angular/router";
import { SignInRequestDto } from "../dto/sign-in-request.dto";
import { catchError, throwError } from "rxjs";
import { SignInResponseDto } from "../dto/sign-in-response.dto";
import { Steps } from '../steps.enum';


@Component({
  selector: "app-send-auth-code-and-act",
  templateUrl: "./send-auth-code-and-act.component.html",
  styles: ``,
})
export class SendAuthCodeAndActComponent implements OnInit {
  @Input() step!:number;
   @Input() emailWhereCodeSended!:string;
   
   
   @Input() modalIsHidden!:boolean;

  confirmedPassword!: string;
  newPassword!: string;
  
  onSendNewPassword() {
    this.engineStepService.setCurrentStep(Steps.OPERATION_RESULT_STATUS);
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
    this.engineStepService.setCurrentStep(Steps.SEND_AUTH_CODE);
  }

  OnSubmit2() {
    console.log("aaaaaa");
    this.activation_success = true;
  }

  onSendActivationCode() {
      this.engineStepService.setCurrentStep(Steps.SEND_NEW_PASSWORD);
  }

  onFinish() {
   

  }
}
