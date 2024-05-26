import { Component /*, OnInit*/ } from "@angular/core";
import type { PublicUserDtoRequest } from "../shared-public-module/dto/public-user.dto";
import { PublicUserService } from "../public-user.service";
import { Router } from "@angular/router";
import { ActivationCodeDtoRequest } from "../shared-public-module/dto/activation-code.dto";
import { throwError } from "rxjs";

@Component({
  selector: "app-register-form-component",
  templateUrl: "./register-form.component.html",
  styleUrls: [
    "./register-form.component.css",
    "../../shared-module/general-styles.css",
  ],
})
export class RegisterFormComponent /* implements OnInit*/ {
  // Forms Fields
  email!: string;
  password!: string;
  pseudonyme!: string;
  activationcode!: string;

  registering_success: boolean = false;
  activation_success: boolean = false;

  // Http response variables
  msgAfterRegisterRequest!: string;
  statusAfterRegisterRequest!: number;

  msgAfterActivationRequest!: string;
  statusAfterActivationRequest!: number;

  constructor(
    private publicUserService: PublicUserService,
    private router: Router
  ) {}

  onSubmitRegister() {
    const userToRegister: PublicUserDtoRequest = {
      name: this.pseudonyme,
      username: this.email,
      password: this.password,
    };
    
    this.publicUserService.addUser(userToRegister).subscribe(
      (response) => {
        if (response.body !== null) {
          this.statusAfterRegisterRequest = response.status;
          this.msgAfterRegisterRequest = response.body;
          this.registering_success = true;
        } else {
          throw new Error("Public user HTTP body needed");
        }
      },
      (error) => {
        this.statusAfterRegisterRequest = error.status;
        this.msgAfterRegisterRequest = error.error.msg;
        return throwError(error);
      }
    );
  }

  OnSubmitActivation() {
    
    const codeForActivation: ActivationCodeDtoRequest = {
      code: this.activationcode,
    };

    this.publicUserService.activateUser(codeForActivation).subscribe(
      (response) => {
        if (response.body !== null) {
          this.statusAfterActivationRequest = response.status;
          this.msgAfterActivationRequest = response.body;
          this.activation_success = true;
        }
      },
      (error) => {
        this.statusAfterActivationRequest = error.status;
        this.msgAfterActivationRequest = error.error.msg;
        return throwError(error);
      }
    );
  }

  goToHome() {
    this.router.navigate([""]);
  }
}
