import { ToastrService } from "ngx-toastr";

import { ProtectedUserService } from "../protected-module/shared-protected-module/user-module/protected-user.service";

import { LanguageManagerService } from "../shared-module/services/language-manager.service";
import { TokenService } from "./services/token.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService: ProtectedUserService,
    private toastr: ToastrService,
    public lang: LanguageManagerService
  ) {}

  canActivate(): Observable<boolean> {
    const bearer: string | null = this.tokenService.getToken();
    if (!bearer) return of(false);

    return this.userService.isAdmin(bearer);
  }
}
