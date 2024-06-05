import { CanActivate, Router } from '@angular/router';
//import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { TokenService } from './services/token.service';
import { Urn } from '../shared-module/enums/urn.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if(this.tokenService.isLogged()) {
      return true;
    }

    this.router.navigate([Urn.SIGN_IN]);
    return false;
  }
}
