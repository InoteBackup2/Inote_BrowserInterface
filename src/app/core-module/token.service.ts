import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  BEARER: string = "bearer";

  constructor() {}

  saveToken(token: string): void {
    localStorage.setItem(this.BEARER, token);
  }

  isLogged(): boolean {
    const token = localStorage.getItem(this.BEARER);
    return !!token; // !! transforme la variable en boolean
  }
}
