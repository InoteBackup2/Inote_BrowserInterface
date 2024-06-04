import { ErrorResponseDto } from "./../../../shared-module/dto/error-response.dto";
import { Component, OnInit } from "@angular/core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ProtectedUserService } from "../user-module/protected-user.service";
import { TokenService } from "../../../core-module/token.service";
import { SignOutRequestDto } from "../dto/sign-out-request.dto";
import { PublicUserResponseDto } from "../../../shared-module/dto/public-user-response.dto";
import { Router } from "@angular/router";
import { HttpStatusCode } from "axios";
import { ToastrService } from "ngx-toastr";

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
  errorResponseDto!: ErrorResponseDto;

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    private userService: ProtectedUserService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // INITIALIZATION (by ngOnInit)
  // ==============================================
  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    if (this.token) {
      this.userService.getCurrentUser(this.token).subscribe(
        (response) => {
          if (response.status !== HttpStatusCode.Ok || response.body === null) {
            this.toastr.error(
              "La récupération de l'utilisateur courant a échouée",
              "Anomalie détectée",
              {
                timeOut: 5000,
              }
            );
          } else {
            this.currentConnectUser = response.body;
          }
        },

        // Error case
        (error) => {
          this.errorResponseDto = JSON.parse(error.error);
          this.toastr.error("La récupération de l'utilisateur courant a echouée", "Anomalie détectée", {
            timeOut: 5000,
          });
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
          if (response.status !== 200 || response.body === null) {
            this.toastr.error(
              "La récupération de l'utilisateur courant a échouée",
              "Anomalie détectée",
              {
                timeOut: 5000,
              }
            );
          } else {
            this.tokenService.removeToken();
            this.router.navigate(["home"]);
          }
        },

        // Error case
        (error) => {
          this.errorResponseDto = JSON.parse(error.error);
          this.toastr.error(this.errorResponseDto.detail, "Anomalie détectée", {
            timeOut: 5000,
          });
        }
      );
    } else {
      this.toastr.error("La valeur du jeton est nulle", "Anomalie détectée", {
        timeOut: 5000,
      });
    }
  }

  onSearchRequested() {
    this.requestedSearch = !this.requestedSearch;
  }
}
