import { Component /*, OnInit*/ } from "@angular/core";
import { PublicUserService } from "../public-user.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { TokenService } from "../../core-module/token.service";
import { CredentialsDto } from "../shared-public-module/dto-module/credentials-dto.dto";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

interface IToken {
  bearer: string;
}

@Component({
  selector: "app-login-form-component",
  templateUrl: "./login-form-component.component.html",
  styleUrls: [
    "./login-form-component.component.css",
    "../../shared-module/general-styles.css",
  ],
})
export class LoginFormComponentComponent {
  token!: IToken;
  email!: string;
  password!: string;
  statusAfterRequest!: number;
  msgAfterRequest!: string;
  credentialsDto!: CredentialsDto | null;

  constructor(
    private publicUserservice: PublicUserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  OnSubmit() {
    console.log(`${this.email}:${this.password}`);
    this.login(this.email, this.password);
  }

  /**
   * Login the user
   *
   * @param email:string
   * @param password:string
   *
   * @author AtsuhikoMochizuki
   * @date 17-05-2024
   */
  private login(email: string, password: string) {
    // Service call
    this.publicUserservice

      // Service method call with datas to send in body
      .loginUser(email, password)

      // Observable subscription
      .subscribe(
        // Handle successful response
        (response: HttpResponse<CredentialsDto>) => {
          this.statusAfterRequest = response.status;
          if (this.statusAfterRequest == 200) {
            this.credentialsDto = response.body;
            if (this.credentialsDto)
              this.tokenService.saveToken(this.credentialsDto?.bearer);
            this.router.navigate(["dashboard"]);
          }
        },

        // Handle error
        (error: HttpErrorResponse) => {
          this.statusAfterRequest = error.status;
          this.msgAfterRequest = error.error.detail;
          return throwError(error.message);
        }
      );
  }
}
