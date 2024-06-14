import { Component, OnInit } from '@angular/core';
import { ProtectedUserResponseDto } from '../shared-protected-module/dtos/protected-user-response.dto';
import { ProtectedUserService } from '../shared-protected-module/user-module/protected-user.service';
import { TokenService } from '../../core-module/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageManagerService } from '../../shared-module/services/language-manager.service';
import { Msg } from '../../shared-module/constants/messages.constant';
import { AppProperties } from '../../app.properties';
import { HttpStatusCode } from 'axios';
import { ErrorResponseDto } from '../../shared-module/dtos/error-response.dto';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: `../../../styles.css`
})
export class UserManagementComponent implements OnInit{
   // RELATING TEMPLATE VARIABLES
  // ==============================================
  users!:ProtectedUserResponseDto[];

   // HTTP
  // ==============================================
  /* Request */
  /* Response */
  errorResponseDto!: ErrorResponseDto;
  
  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    private userService: ProtectedUserService,
    private tokenService: TokenService,
    // private router: Router,
    private toastr: ToastrService,
    public lang: LanguageManagerService
  ) {}
  
  ngOnInit(): void {
    const bearer = this.tokenService.getToken();
    if(!bearer){
      this.toastr.error(
        this.lang.pickMsg(Msg.auth.errors.NULL_TOKEN_VALUE),
        this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
        { timeOut: AppProperties.TOASTER_TIMEOUT }
      );
      throw new Error(Msg.auth.errors.NULL_TOKEN_VALUE);
    }

    if(bearer){
      this.userService.getAllUsers(bearer)
      .subscribe(
        (response)=>{
          if (response.status !== HttpStatusCode.Ok || response.body === null) {
            // Should be catched in error
            this.toastr.error(
              this.lang.pickMsg(Msg.user.errors.RECOVERY_ALL_USERS_FAILED),
              this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
              { timeOut: AppProperties.TOASTER_TIMEOUT }
            );
            throw new Error("Response should not have empty body or status code should be OK");
          }
          this.users = response.body;
        },
        (error)=>{
          this.errorResponseDto = JSON.parse(error.error);
          this.toastr.error(
            this.lang.pickMsg(this.errorResponseDto.detail),
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            { timeOut: AppProperties.TOASTER_TIMEOUT }
          );
        }
      )
    }
  }
}


