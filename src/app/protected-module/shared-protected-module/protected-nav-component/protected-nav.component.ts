import { SignInResponseDto } from "./../../../public-module/shared-public-module/dtos/sign-in-response.dto";
import { RefreshTokenRequestDto } from "./../dtos/refresh-token-request.dto";
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
import { Urn } from "../../../shared-module/enums/urn.enum";
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
  profileManagementPath: string = Msg.webpage_staticText.protectedNavBar.PROFILE_MANAGEMENT;
  signoutPath: string = Msg.webpage_staticText.protectedNavBar.SIGNOUT;
  myBoardsPath: string = Msg.webpage_staticText.protectedNavBar.MY_BOARDS;
  myTeamsPath: string = Msg.webpage_staticText.protectedNavBar.MY_TEAMS;
  searchPath: string = Msg.webpage_staticText.protectedNavBar.SEARCH;

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
  refreshTokenRequestDto!: RefreshTokenRequestDto;

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
    // token is not present
    if (!this.token) {
      this.toastr.error(
        this.lang.pickMsg(Msg.auth.errors.NULL_TOKEN_VALUE),
        this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
        { timeOut: AppProperties.TOASTER_TIMEOUT }
      );
      throw new Error(Msg.auth.errors.NULL_TOKEN_VALUE);
    }

    // User informations recuperation with token
    this.userService.getCurrentUser(this.token).subscribe(
      // Current user recup success
      (response) => {
        if (response.status !== HttpStatusCode.Ok || response.body === null) {
          // Should be catched in error
          this.toastr.error(
            this.lang.pickMsg(Msg.user.errors.RECOVERY_CURRENT_USER_FAILED),
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            { timeOut: AppProperties.TOASTER_TIMEOUT }
          );
          throw new Error("Response should not have empty body");
        }

        // SUCCES OF OPERATION : Get user informations for display in navBar
        this.currentConnectUser = response.body;
      },

      // Error case
      (error) => {
        this.errorResponseDto = error.error;
        if (
          this.errorResponseDto.status === HttpStatusCode.Unauthorized &&
          this.errorResponseDto.detail === "The JWT has expired"
        ) {
          // Send of refresh token
          const refreshToken = this.tokenService.getRefreshToken();

          // Refresh token won't be null
          if (refreshToken === null) {
            this.toastr.error(
              this.lang.pickMsg(
                Msg.toasts.errors.details.USER_SHOULD_HAVE_A_REFRESH_TOKEN
              ),
              this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
              { timeOut: AppProperties.TOASTER_TIMEOUT }
            );
            throw new Error(
              Msg.toasts.errors.details.USER_SHOULD_HAVE_A_REFRESH_TOKEN
            );
          }

          this.refreshTokenRequestDto = {
            refresh: refreshToken,
          };
          this.sendRefreshtoken(this.refreshTokenRequestDto).then(
            (response) => {
              const signInResponseDto: SignInResponseDto = response;
              if (signInResponseDto === null) {
                // Should be catch in error
                this.toastr.error(
                  this.lang.pickMsg(
                    Msg.auth.errors.REFRESH_TOKEN_REQUEST_FAILED
                  ),
                  this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
                  { timeOut: AppProperties.TOASTER_TIMEOUT }
                );
                throw new Error(Msg.auth.errors.REFRESH_TOKEN_REQUEST_FAILED);
              }
              // Save credentials in local storage
              this.tokenService.saveToken(signInResponseDto.bearer);
              this.tokenService.saveRefreshToken(signInResponseDto.refresh);

              // Get current with new bearer
              this.userService
                .getCurrentUser(signInResponseDto.bearer)
                .subscribe(
                  (response) => {
                    if (
                      response.status !== HttpStatusCode.Ok ||
                      response.body === null
                    ) {
                      // Should be catched in error
                      this.toastr.error(
                        this.lang.pickMsg(
                          Msg.user.errors.RECOVERY_CURRENT_USER_FAILED
                        ),
                        this.lang.pickMsg(
                          Msg.toasts.errors.titles.DETECTED_ANOMALY
                        ),
                        { timeOut: AppProperties.TOASTER_TIMEOUT }
                      );
                      throw new Error(
                        Msg.user.errors.RECOVERY_CURRENT_USER_FAILED
                      );
                    }
                    // SUCCESS OF OPERATION
                    this.currentConnectUser = response.body;
                  },

                  (error) => {
                    // FAILED OPERATION
                    const errorResponseDto: ErrorResponseDto = error.error;

                    this.toastr.error(
                      errorResponseDto.detail,
                      this.lang.pickMsg(
                        Msg.toasts.errors.titles.DETECTED_ANOMALY
                      ),
                      { timeOut: AppProperties.TOASTER_TIMEOUT }
                    );
                    throw new Error(
                      Msg.auth.errors.REFRESH_TOKEN_REQUEST_FAILED
                    );
                  }
                );
            },
            // Send refresh token failed
            (error) => {
              this.toastr.error(
                error,
                this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
                { timeOut: AppProperties.TOASTER_TIMEOUT }
              );
              throw new Error(error);
            }
          );
        }
      }
    );
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
              this.lang.pickMsg(Msg.auth.errors.USER_SIGNOUT_FAILED),
              this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
              { timeOut: AppProperties.TOASTER_TIMEOUT }
            );
          } else {
            this.tokenService.removeToken();
            this.router.navigate([Urn.HOME]);
          }
        },

        // Error case
        (error) => {
          this.errorResponseDto = JSON.parse(error.error);
          if (
            this.errorResponseDto.status === HttpStatusCode.Unauthorized &&
            this.errorResponseDto.detail === "The JWT has expired"
          ) {
            const refreshToken = this.tokenService.getRefreshToken();
            if (refreshToken === null) {
              this.toastr.error(
                this.lang.pickMsg(
                  Msg.toasts.errors.details.USER_SHOULD_HAVE_A_REFRESH_TOKEN
                ),
                this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
                { timeOut: AppProperties.TOASTER_TIMEOUT }
              );
            } else {
              this.refreshTokenRequestDto = {
                refresh: refreshToken,
              };
              this.sendRefreshtoken(this.refreshTokenRequestDto).then(
                () => {
                  this.tokenService.removeRefreshToken();
                  this.tokenService.removeToken();
                  this.router.navigate([Urn.HOME]);
                },
                (error) => {
                  this.toastr.error(
                    error,
                    this.lang.pickMsg(
                      Msg.toasts.errors.titles.DETECTED_ANOMALY
                    ),
                    { timeOut: AppProperties.TOASTER_TIMEOUT }
                  );
                }
              );
            }
          } else {
            this.toastr.error(
              this.errorResponseDto.detail,
              this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
              { timeOut: AppProperties.TOASTER_TIMEOUT }
            );
          }
        }
      );
    } else {
      this.toastr.error(
        // Connected user should have a non null token value
        this.lang.pickMsg(Msg.auth.errors.NULL_TOKEN_VALUE),
        this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
        { timeOut: AppProperties.TOASTER_TIMEOUT }
      );
    }
  }

  onSearchRequested() {
    this.requestedSearch = !this.requestedSearch;
  }

  /**
   * Send refresh token
   *
   * @param refreshTokenRequestDto that contains refresh token value
   * @returns promise than contains new jwt and refresh token values
   *
   * @author atsuhikoMochizuki
   * @since 2024-06-06
   */
  sendRefreshtoken(
    refreshTokenRequestDto: RefreshTokenRequestDto
  ): Promise<SignInResponseDto> {
    const promise: Promise<SignInResponseDto> = new Promise(
      (resolve, reject) => {
        this.userService.sendRefreshToken(refreshTokenRequestDto).subscribe(
          (response) => {
            if (
              response.status !== HttpStatusCode.Created ||
              response.body === null
            ) {
              reject("Refresh token request has failed");
            } else {
              const signInResponseDto: SignInResponseDto = response.body;
              resolve(signInResponseDto);
            }
          },
          (error) => {
            const errorResponseDto: ErrorResponseDto = error.error;
            reject(errorResponseDto.detail);
          }
        );
      }
    );

    return promise;
  }
}
