import { Component, OnInit } from "@angular/core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ProtectedUserService } from "../user-module/protected-user.service";
import { TokenService } from "../../../core-module/token.service";
import { SignOutRequestDto } from "../dto/sign-out-request.dto";
import { PublicUserResponseDto } from "../../../shared-module/dto/public-user-response.dto";
import { throwError } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-protected-nav-component",
  templateUrl: "./protected-nav.component.html",
  styleUrls: ["./protected-nav.component.css"],
})
export class ProtectedNavComponent implements OnInit {
  // RELATING TEMPLATE VARIABLES
  // ==============================================
  currentConnectUser!: PublicUserResponseDto | null;

  // MISCELLEANOUS VARIABLES
  // ==============================================
  requestedSearch!: boolean;
  faMagnifyingGlass = faMagnifyingGlass;

  // HTTP
  // ==============================================
  /* Request */
  token!: string | null;
  signOutRequestDto!: SignOutRequestDto;
  getCurrentUserResponseStatus!: number;
  getCurrentUserMsgToDisplay!: string | null;
  signOutResponseStatus!: number;
  signOutResponseBody!: string | null;

  /* Response */
  
  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    private userService: ProtectedUserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  // INITIALIZATION (by ngOnInit)
  // ==============================================
  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    if (this.token) {
      this.userService.getCurrentUser(this.token).subscribe(
        (response) => {
          // get response status
          this.getCurrentUserResponseStatus = response.status;
          // get response body
          this.currentConnectUser = response.body;

          // Response treatement
          if (
            this.getCurrentUserResponseStatus! == 200 ||
            this.currentConnectUser === null
          ) {
            throw new Error("HTTP body hasn't to be null");
          }
        },

        // Error case
        (error) => {
          this.getCurrentUserResponseStatus = error.status;
          this.getCurrentUserMsgToDisplay = error.error.msg;
          return throwError(error);
        }
      );
    }
  }

  // TEMPLATE CALLBACKS METHODS
  // ==============================================
  /**
   * Signout current connected user
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onSignOut(): void {
    this.token = this.tokenService.getToken();
    if (this.token !== null) {
      this.userService.signOut(this.token).subscribe(
        // Response case
        (response) => {
          // get response status
          this.signOutResponseStatus = response.status;
          // get response body
          this.signOutResponseBody = response.body;

          // Response treatement
          if (
            this.signOutResponseStatus !== 200 ||
            this.signOutResponseBody === null
          ) {
            throw new Error("Anomaly in SignOut Http response");
          }
          this.router.navigate(["home"]);
        },

        // Error case
        (error) => {
          this.signOutResponseStatus = error.status;
          return throwError(error);
        }
      );
    } else {
      throw new Error("token should not be null");
    }
  }

  onSearchRequested() {
    this.requestedSearch = !this.requestedSearch;
  }
}
