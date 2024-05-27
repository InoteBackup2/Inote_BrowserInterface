import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenService {

  // SERVICE properties
  // ==============================================
  BEARER: string = "bearer";

  // SERVICE METHODS
  // ==============================================

  /**
   * Put token in localStorage
   *
   * @param {string} token
   * 
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  saveToken(token: string): void {
    localStorage.setItem(this.BEARER, token);
  }

  
  /**
   * Retrieves the connection status of the main user
   *
   * @returns {boolean}
   * 
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  isLogged(): boolean {
    const token = localStorage.getItem(this.BEARER);
    return !!token; // !! transforme la variable en boolean
  }

  /**
   * Retrieves the token from local storage
   * 
   * @returns token if exists else null
   * 
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  getToken() : string | null {
    return localStorage.getItem(this.BEARER);
  }
}
