import { SignInResponseDto } from './../shared-public-module/dto/sign-in-response.dto';
import { SignInRequestDto } from './../shared-public-module/dto/sign-in-request.dto';
import { Component /*, OnInit*/ } from "@angular/core";
import { PublicUserService } from "../public-user.service";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { TokenService } from "../../core-module/token.service";

@Component({
  selector: "app-login-form-component",
  templateUrl: "./login-form.component.html",
  styleUrls: [
    "./login-form.component.css",
    "../../shared-module/general-styles.css",
  ],
})
export class LoginFormComponent {
  email!: string;
  password!: string;
  statusAfterRequest!: number;
  msgAfterRequest!: string;
  signInResponseDto!: SignInResponseDto;

  constructor(
    private publicUserservice: PublicUserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  OnSubmit() {
    const signInRequestDto: SignInRequestDto = {
      "username": this.email,
      "password": this.password
    };

    this.publicUserservice
      .loginUser(signInRequestDto)
      .pipe(
        catchError((error) => {
          this.statusAfterRequest = error.status;
          this.msgAfterRequest = error.error.detail;
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.statusAfterRequest = response.status;
        if (response.status === 200 && response.body !== null) {
          this.signInResponseDto = response.body;
          this.tokenService.saveToken(this.signInResponseDto.bearer);
          this.router.navigate(["dashboard"]);
        }
      });
  }
}
