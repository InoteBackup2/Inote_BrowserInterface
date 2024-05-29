import { EngineStepService } from './../engine-step.service';
import { Component, Input, OnInit } from "@angular/core";
import { ChangePasswordRequestDto } from "../dto/change-password-request.dto";
import { PublicUserService } from "../../public-user.service";
import { TokenService } from "../../../core-module/token.service";
import { Router } from "@angular/router";
import { SignInResponseDto } from "../dto/sign-in-response.dto";
import { Steps } from '../steps.enum';


@Component({
  selector: "app-send-auth-code-and-act",
  templateUrl: "./send-auth-code-and-act.component.html",
  styles: ``,
})
export class SendAuthCodeAndActComponent implements OnInit {
  
  // RELATING TEMPLATE VARIABLES
  // ==============================================
  @Input() emailWhereCodeSended!:string;
  confirmedPassword!: string;
  newPassword!: string;
  activationcode!: number;
  email!: string;
  
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
  // OnSubmit() {
  //   const signInRequestDto: SignInRequestDto = {
  //     username: this.email,
  //     password: this.password,
  //   };

  //   this.publicUserservice
  //     .loginUser(signInRequestDto)
  //     .pipe(
  //       catchError((error) => {
  //         this.changePasswordResponseStatus = error.status;
  //         this.changePasswordResponseBody = error.error.detail;
  //         return throwError(error);
  //       })
  //     )
  //     .subscribe((response) => {
  //       this.changePasswordResponseStatus = response.status;
  //       if (response.status === 200 && response.body !== null) {
  //         this.signInResponseDto = response.body;
  //         this.tokenService.saveToken(this.signInResponseDto.bearer);
  //         this.router.navigate(["dashboard"]);
  //       }
  //     });
  // }

  // onChangePasswordAsked() {
  //   this.changePasswordRequestBody = {
  //     email: this.email,
  //   };

  //   this.publicUserservice
  //     .askChangePassword(this.changePasswordRequestBody)
  //     .pipe(
  //       catchError((error) => {
  //         this.changePasswordResponseStatus = error.status;
  //         this.changePasswordResponseBody = error.error.detail;
  //         return throwError(error);
  //       })
  //     )
  //     .subscribe((response) => {
  //       this.askedChangePassword = true;
  //       this.changePasswordResponseStatus = response.status;
  //       if (response.status === 200 && response.body !== null) {
  //         this.changePassword_success = true;
  //       } else {
  //         throw new Error(
  //           "HTTP Response anomaly : body is empty or status code not attempted"
  //         );
  //       }
  //     });
  // }

  onAskingReceiveCode() {
    this.engineStepService.setCurrentStep(Steps.SEND_AUTH_CODE);
  }

  onSendActivationCode() {
      this.engineStepService.setCurrentStep(Steps.SEND_NEW_PASSWORD);
  }

  onSendNewPassword() {
    this.engineStepService.setCurrentStep(Steps.OPERATION_RESULT_STATUS);
  }
}
