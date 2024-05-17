import { Component} from "@angular/core";
import { PublicUserDto } from "../shared-public-module/dto-module/public-user-dto.dto";
import { PublicUserService } from "../public-user.service";
import { throwError } from "rxjs";
import { Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-register-form-component",
  templateUrl: "./register-form-component.component.html",
  styleUrls: [
    "./register-form-component.component.css",
    "../../shared-module/general-styles.css",
  ],
})
export class RegisterFormComponentComponent{
  // Forms Fields
  email!: string;
  password!: string;
  pseudonyme!: string;
  activationcode!: string;

  registering_success: boolean = false;
  activation_success: boolean = false;

  userToRegister!: PublicUserDto;

  // Http response variables
  msgAfterRegisterRequest!: string | null;
  statusAfterRegisterRequest!: number;

  msgAfterActivationRequest!: string;
  statusAfterActivationRequest!: number;

  constructor(
    private publicUserService: PublicUserService,
    private router: Router
  ) {}

  private registerUser(user: PublicUserDto):void{
    // Service call
    this.publicUserService

      // Service method call with datas to send in body
      .addUser(user)

      // Observable subscription
      .subscribe(
        // Handle successful response
        (response: HttpResponse<string>) => {
          this.statusAfterActivationRequest = response.status;
          if (response.body) {
            this.msgAfterActivationRequest = response.body;
            this.activation_success = true;
          } else {
            this.activation_success = false;
          }
        },

        // Handle error
        (error: HttpErrorResponse) => {
          this.statusAfterActivationRequest = error.status;
          this.msgAfterActivationRequest = error.error.detail;
          return throwError(error.message);
        }
      );
  }

  private activateUser(activationCode: string) {
    // Service call
    this.publicUserService

      // Service method call with datas to send in body
      .activateUser(activationCode)

      // Observable subscription
      .subscribe(
        // Handle successful response
        (response: HttpResponse<string>) => {
          this.statusAfterActivationRequest = response.status;
          if (response.body) {
            this.msgAfterActivationRequest = response.body;
            this.activation_success = true;
          } else {
            this.activation_success = false;
          }
        },

        // Handle error
        (error: HttpErrorResponse) => {
          this.statusAfterActivationRequest = error.status;
          this.msgAfterActivationRequest = error.error.detail;
          return throwError(error.message);
        }
      );
  }
  
  OnSubmit() {
    this.registerUser(
      new PublicUserDto(this.pseudonyme, this.email, this.password)
    );
  }

  OnSubmitActivation() {
    this.activateUser(this.activationcode);
  }

  goToHome() {
    this.router.navigate([""]);
  }
}
