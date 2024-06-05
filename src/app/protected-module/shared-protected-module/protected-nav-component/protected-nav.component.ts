import { ErrorResponseDto } from "../../../shared-module/dtos/error-response.dto";
import { Component, OnInit } from "@angular/core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ProtectedUserService } from "../user-module/protected-user.service";
import { TokenService } from "../../../core-module/services/token.service";
import { SignOutRequestDto } from "../dtos/sign-out-request.dto";
import { PublicUserResponseDto } from "../../../shared-module/dtos/public-user-response.dto";
import { Router } from "@angular/router";
import { HttpStatusCode } from "axios";
import { ToastrService } from "ngx-toastr";
import { AppProperties } from "../../../app.properties";
import { Urn } from '../../../shared-module/enums/urn.enum';
import { LanguageManagerService } from "../../../shared-module/services/language-manager.service";
import { Msg } from "../../../shared-module/constants/messages.constant";

@Component({
  selector: "app-protected-nav-component",
  templateUrl: "./protected-nav.component.html",
  styleUrls: ["./protected-nav.component.css"],
})
export class ProtectedNavComponent implements OnInit {
  
  // RELATING TEMPLATE VARIABLES
  // ==============================================
  profileManagementPath:string=Msg.protectedNavBar.PROFILE_MANAGEMENT;
  signoutPath:string=Msg.protectedNavBar.SIGNOUT;
  myBoardsPath:string=Msg.protectedNavBar.MY_BOARDS;
  myTeamsPath:string=Msg.protectedNavBar.MY_TEAMS;
  searchPath:string=Msg.protectedNavBar.SEARCH;

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
    private toastr: ToastrService,
    public lang: LanguageManagerService
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
              this.lang.pickMsg(Msg.user.errors.RECOVERY_CURRENT_USER_FAILED),
              this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
              {timeOut: AppProperties.TOASTER_TIMEOUT}
            );
          } else {
            this.currentConnectUser = response.body;
          }
        },

        // Error case
        (error) => {
          this.errorResponseDto = JSON.parse(error.error);
          this.toastr.error(
          this.errorResponseDto.detail,
          this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            {timeOut: AppProperties.TOASTER_TIMEOUT}
          );
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
          if (response.status !== HttpStatusCode.Ok || response.body === null) {
              this.toastr.error(
                this.lang.pickMsg(Msg.user.errors.RECOVERY_CURRENT_USER_FAILED),
                this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
                {timeOut: AppProperties.TOASTER_TIMEOUT}
              );
          } else {
            this.tokenService.removeToken();
            this.router.navigate([Urn.HOME]);
          }
        },

        // Error case
        (error) => {
          this.errorResponseDto = JSON.parse(error.error);
          this.toastr.error(
            this.errorResponseDto.detail,
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            {timeOut: AppProperties.TOASTER_TIMEOUT}
          );
        }
      );
    } else {
      this.toastr.error(
        this.lang.pickMsg(Msg.auth.errors.NULL_TOKEN_VALUE),
        this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
        {timeOut: AppProperties.TOASTER_TIMEOUT}
      );
    }
  }

  onSearchRequested() {
    this.requestedSearch = !this.requestedSearch;
  }
}
