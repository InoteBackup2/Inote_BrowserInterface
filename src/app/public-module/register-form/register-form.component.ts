import { ActivationRequestDto } from "./../shared-public-module/dto/activation-request.dto";
import { Component /*, OnInit*/ } from "@angular/core";
import type { RegisterRequestDto } from "../shared-public-module/dto/register-request.dto";
import { PublicUserService } from "../public-user.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";

@Component({
  selector: "app-register-form-component",
  templateUrl: "./register-form.component.html",
  styleUrls: [
    "./register-form.component.css",
    "../../shared-module/general-styles.css",
  ],
})
export class RegisterFormComponent {
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

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    private publicUserService: PublicUserService,
    private router: Router
  ) {}

  // INITIALIZATION (by ngOnInit)
  // ==============================================

  // TEMPLATE CALLBACKS METHODS
  // ==============================================

  /**
   * Register a new user account
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onSubmitRegister() {
    // Dto creation if needed
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
          this.registering_success = true;
        } else {
          throw new Error("HTTP Response body is empty");
        }
      },

      // Error case
      (error) => {
        this.registerResponseStatus = error.status;
        this.registerResponseMsgToDisplay = error.error.msg;
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
        } else {
          throw new Error("HTTP Response body is empty");
        }
      },

      // Error case
      (error) => {
        this.activationResponseStatus = error.status;
        this.activationResponseMsgToDisplay = error.error.msg;
        return throwError(error);
      }
    );
  }

  
  /**
   * Navigate to landign page
   * 
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onGoToHome() {
    this.router.navigate(["home"]);
  }
}
