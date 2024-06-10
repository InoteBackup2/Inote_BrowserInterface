import { CanActivate, Router } from '@angular/router';
import { HttpStatusCode } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { AppProperties } from '../app.properties';
import { ProtectedUserService } from '../protected-module/shared-protected-module/user-module/protected-user.service';
import { Msg } from '../shared-module/constants/messages.constant';
import { PublicUserResponseDto } from '../shared-module/dtos/public-user-response.dto';
import { Role } from '../shared-module/enums/role.enum';
import { LanguageManagerService } from '../shared-module/services/language-manager.service';
import { TokenService } from './services/token.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserManagementComponent } from '../protected-module/user-management-component/user-management.component';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  toto:boolean=false;
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService: ProtectedUserService,
    private toastr: ToastrService,
    public lang: LanguageManagerService
  ) {}

  canActivate(route:UserManagementComponent): Observable<boolean> {
    
    if (!this.tokenService.isLogged()) {
      return of(false);
    }

    const userToken = this.tokenService.getToken();
    if (!userToken) return of(false);

    this.userService.getCurrentUser(userToken).subscribe(
      (response) => {
        if (response.status !== HttpStatusCode.Ok || response.body === null) {
          this.toastr.error(
            this.lang.pickMsg(Msg.toasts.errors.titles.REQUEST_HAS_FAILED),
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            { timeOut: AppProperties.TOASTER_TIMEOUT }
          );
          return false;
        }

        const currentUser: PublicUserResponseDto = response.body;
        if (currentUser.role !== Role.ADMIN) return false;
        this.toto=true;
        return true;
      },

      (error) => {
        const errorResponseDto = JSON.parse(error.error);
        this.toastr.error(
          errorResponseDto.detail,
          this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
          { timeOut: AppProperties.TOASTER_TIMEOUT }
        );
        return false;
      }
    );
    return of(false);
    }
}
