import { ErrorResponseDto } from "./../../../../shared-module/dtos/error-response.dto";
import { PublicUserResponseDto } from "./../../../../shared-module/dtos/public-user-response.dto";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProtectedUserService } from "../protected-user.service";
import { TokenService } from "../../../../core-module/services/token.service";
import { ToastrService } from "ngx-toastr";
import { LanguageManagerService } from "../../../../shared-module/services/language-manager.service";
import { Msg } from "../../../../shared-module/constants/messages.constant";
import { HttpStatusCode } from "axios";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrl: `./../../../../../styles.css`,
})
export class UserComponent implements OnInit {
  // RELATING TEMPLATE VARIABLES
  // ==============================================
  @Input() username!: string;

  toolTips_teamsPath: string = Msg.webpage_staticText.user.TOOLTIP_TEAMS;
  toolTips_editPath: string = Msg.webpage_staticText.user.TOOLTIP_EDIT;
  toolTips_deletePath: string = Msg.webpage_staticText.user.TOOLTIP_DELETE;
  toolTips_changeRolePath: string =
    Msg.webpage_staticText.user.TOOLTIP_CHANGE_ROLE;

  publicUserResponseDto!: PublicUserResponseDto;
  errorResponseDto!: ErrorResponseDto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: ProtectedUserService,
    private toaster: ToastrService,
    private tokenService: TokenService,
    public lang: LanguageManagerService
  ) {}

  ngOnInit(): void {
    const bearer: string | null = this.tokenService.getToken();
    if (!bearer) {
      this.toaster.warning(
        this.lang.pickMsg(Msg.auth.errors.NULL_TOKEN_VALUE),
        this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY)
      );
    } else {
      this.userService.getUserByUsername(this.username, bearer).subscribe(
        (response) => {
          if (response.status !== HttpStatusCode.Ok || response.body === null) {
            this.toaster.error(
              this.lang.pickMsg(
                Msg.user.errors.RECOVERY_OF_THE_REQUESTED_USER_HAS_FAILED
              ),
              this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY)
            );
          } else {
            this.publicUserResponseDto = response.body;
          }
        },
        (error) => {
          this.errorResponseDto = error;
          this.toaster.error(
            this.lang.pickMsg(this.errorResponseDto.detail),
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY)
          );
        }
      );
    }
  }

  // deleteUser(user: User) {
  //   // this.userService.deleteUserById(user.id)
  //   // .subscribe(()=>this.goToUserList());
  // }

  // GOTOUSERLIST() {
  //   // THIS.ROUTER.NAVIGATE(['/USERS']);
  // }

  // GOTTOEDITUSER(USER: USER) {
  //   // THIS.ROUTER.NAVIGATE(['/EDIT/USER/', USER.ID])
  // }
}
