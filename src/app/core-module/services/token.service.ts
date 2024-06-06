import { Injectable } from '@angular/core';
import { HttpConstants } from '../../shared-module/constants/http.constant';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  // SERVICE properties
  // ==============================================
  private readonly BEARER: string = HttpConstants.headers.auth.BEARER;
  private readonly REFRESH: string = HttpConstants.headers.auth.REFRESH;
  

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
    if(this.getToken()!== null)
      this.removeToken();
    localStorage.setItem(this.BEARER, token);
  }

  /**
   * Put refreshToken in localStorage
   *
   * @param {string} refreshToken
   * 
   * @author atsuhikoMochizuki
   * @since 2024-06-06
   */
  saveRefreshToken(refreshToken:string):void{
    if(this.getRefreshToken()!== null)
      this.removeRefreshToken();
    localStorage.setItem(this.REFRESH,refreshToken);
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

  /**
   * Retrieves the refresh token from local storage
   * 
   * @returns refresh token if exists else null
   * 
   * @author atsuhikoMochizuki
   * @since 2024-06-04
   */
  getRefreshToken() : string | null {
    return localStorage.getItem(this.REFRESH);
  }

  /**
   * Remove the token from local storage
   * 
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  removeToken():void {
    localStorage.removeItem(this.BEARER);
  }

  /**
   * Remove the refresh token from local storage
   * 
   * @author atsuhikoMochizuki
   * @since 2024-06-04
   */
  removeRefreshToken():void {
    localStorage.removeItem(this.REFRESH);
  }
}
