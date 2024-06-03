import { ErrorResponseDto } from "./../../shared-module/dto/error-response.dto";
import { ActivationRequestDto } from "./../shared-public-module/dto/activation-request.dto";
import { Component, OnInit} from "@angular/core";
import type { RegisterRequestDto } from "../shared-public-module/dto/register-request.dto";
import { PublicUserService } from "../public-user.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { ActivateUserManagerService } from "../shared-public-module/modals/activate-user/activate-user-manager.service";
import { ActivateUserStepsEnum } from "../shared-public-module/modals/activate-user/activate-user-steps.enum";

@Component({
  selector: "app-register-form-component",
  templateUrl: "./register-form.component.html",
  styleUrls: [
    "./register-form.component.css",
    "../../shared-module/general-styles.css",
  ],
})
export class RegisterFormComponent implements OnInit{

  // RELATING TEMPLATE VARIABLES
  // ==============================================
  username!: string;
  password!: string;
  pseudonyme!: string;
  activationcode!: string;
  registering_success: boolean = false;
  activation_success: boolean = false;
  registerResponseMsgToDisplay!: string | null;
  activationResponseMsgToDisplay!: string | null;
  errorMsgToSend!: string;
  globalSuccessState!: boolean;
  inProgress!:boolean;
  modalIsReady!:boolean;


  

  // HTTP
  // ==============================================
  /* Request */
  registerRequestBody!: RegisterRequestDto;
  activationRequestBody!: ActivationRequestDto;

  /* Response */
  registerResponseBody!: string | null;
  registerResponseStatus!: number;
  activationResponseBody!: string | null;
  activationResponseStatus!: number;

  errorResponseDto!: ErrorResponseDto;
  activateUserStep!: ActivateUserStepsEnum;

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    private publicUserService: PublicUserService,
    private router: Router,
    private activateUserManagerService: ActivateUserManagerService
  ) {}

  // INITIALIZATION (by ngOnInit)
  // ==============================================
  ngOnInit(): void {
      this.activateUserStep=ActivateUserStepsEnum.INIT;
  }
  // TEMPLATE CALLBACKS METHODS
  // ==============================================

  /**
   * Register a new user account
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onSubmitRegister() {
    this.registerRequestBody = {
      pseudo: this.pseudonyme,
      username: this.username,
      password: this.password,
    };

    this.publicUserService.addUser(this.registerRequestBody).subscribe(
      // Response case
      (response) => {
        // get response status
        this.registerResponseStatus = response.status;
        // get response body
        this.registerResponseBody = response.body;

        // Response treatement
        if (
          this.registerResponseStatus === 201 &&
          this.registerResponseBody !== null
        ) {
          this.registerResponseMsgToDisplay = response.body;
          this.activateUserStep = ActivateUserStepsEnum.SEND_AUTH_CODE;
          
          
        } else {
         
         throw new Error("Anomaly during register operation");
        }
      },

      // Error case
      (error) => {
      this.errorResponseDto = JSON.parse(error.error);
        this.errorMsgToSend = this.errorResponseDto.detail;
        
        return throwError(error);
      }
    );
  }

  /**
   * Activate the newly created user account
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onSubmitActivation() {
    this.inProgress=true;
    // Dto creation if needed
    this.activationRequestBody = {
      code: this.activationcode,
    };

    this.publicUserService.activateUser(this.activationRequestBody).subscribe(
      // Response case
      (response) => {
        // get response status
        this.activationResponseStatus = response.status;
        // get response body
        this.activationResponseBody = response.body;

        // Response treatement
        if (
          this.activationResponseStatus === 200 &&
          this.activationResponseBody !== null
        ) {
          this.activationResponseMsgToDisplay = this.activationResponseBody;
          this.activation_success = true;
          this.inProgress=false;
        } else {
          this.inProgress=false;
          throw new Error("HTTP Response body is empty");
        }
      },

      // Error case
      (error) => {
        this.activationResponseStatus = error.status;
        this.activationResponseMsgToDisplay = error.error.msg;
        this.inProgress=false;
        return throwError(error);
      }
    );
  }

  onCloseModal() {
    this.activateUserManagerService.setCurrentStep(ActivateUserStepsEnum.INIT);
    this.registering_success
      ? (this.globalSuccessState = true)
      : (this.globalSuccessState = false);
    this.registering_success = false;
  }

  /**
   * Navigate to landing page
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onGoToHome() {
    this.router.navigate(["home"]);
  }

  onLogin() {
    this.router.navigate(["login"]);
    }
}
