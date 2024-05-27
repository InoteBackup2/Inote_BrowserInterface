import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import type { RegisterRequestDto } from "./shared-public-module/dto/register-request.dto";
import { BackEndPoints } from "./shared-public-module/back-end-points.enum";
import { ActivationRequestDto } from "./shared-public-module/dto/activation-request.dto";
import { SignInRequestDto } from "./shared-public-module/dto/sign-in-request.dto";
import { SignInResponseDto } from "./shared-public-module/dto/sign-in-response.dto";

@Injectable()
export class PublicUserService {
  // HTTP
  // ==============================================
  /* Headers variables */
  private bearer!: string;

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(private http: HttpClient) {}

  // SERVICE METHODS
  // ==============================================

  /**
   * Sends the request to create a new user account
   *
   * @param {RegisterRequestDto} Needed user account informations
   * @returns {Observable<HttpResponse<string>>}  Response message
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  addUser(user: RegisterRequestDto): Observable<HttpResponse<string>> {
    // Headers definitions
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.bearer}`,
    });

    return this.http.post(
      // Url
      BackEndPoints.REGISTER,

      // Body Request
      JSON.stringify(user),

      // Options
      {
        // Uncomment if body response is plain/text
        responseType: "text",

        // headers injection
        headers: headers,

        // Uncomment if request progression is needed
        reportProgress: true,

        // Get full Http response
        observe: "response",
      }
    );
  }

  activateUser(
    activationCode: ActivationRequestDto
  ): Observable<HttpResponse<string>> {
    const headers = { "content-type": "application/json" };
    return this.http.post(
      BackEndPoints.ACTIVATE,
      JSON.stringify(activationCode),
      {
        responseType: "text",
        headers: headers,
        reportProgress: true,
        observe: "response",
      }
    );
  }

  loginUser(
    signInRequestDto: SignInRequestDto
  ): Observable<HttpResponse<SignInResponseDto>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http.post<SignInResponseDto>(
      BackEndPoints.SIGN_IN,
      JSON.stringify(signInRequestDto),
      {
        headers: headers,
        reportProgress: true,
        observe: "response",
      }
    );
  }
}