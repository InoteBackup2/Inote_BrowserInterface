import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { PublicUserDto } from "./shared-public-module/dto-module/public-user-dto.dto";
import { BackEndPoints } from "./shared-public-module/back-end-points.constants";
import { CredentialsDto } from "./shared-public-module/dto-module/credentials-dto.dto";

@Injectable()
export class PublicUserService {
  // Http client injection
  constructor(private http: HttpClient) {}

  /**
   * Get the current user connected
   *
   * @param user required informations of user for inscription
   *
   * @returns Observable on :
   *  - type returned by error if error
   *  - HttpResponse<DataTypeOfBodyResponse> if success
   *
   * @author AtsuhikoMochizuki
   * @date 17-05-2024
   */
  addUser(
    user: PublicUserDto
  ): Observable<HttpResponse<string>> {
    return (
      //Envoi de la requête
      this.http

        // Method type whith type of attempted data in body response
        .post<string>(
          // Url
          BackEndPoints.REGISTER,

          //Serialized body data
          user.serializedData(),

          //Options
          {
            headers: { "content-type": "application/json" },
            observe: "response",
          }
        )
    );
  }

  /**
   * Get the current user connected
   *
   * @param bearer the Json Web Token obtained on sign in
   *
   * @returns Observable on :
   *  - type returned by error if error
   *  - HttpResponse<DataTypeOfBodyResponse> if success
   *
   * @author AtsuhikoMochizuki
   * @date 17-05-2024
   */
  getCurrentUser(
    bearer: string
  ): Observable<HttpResponse<PublicUserDto>> {
    return (
      //Envoi de la requête
      this.http

        // Method type whith type of attempted data in body response
        .get<PublicUserDto>(
          // Url
          BackEndPoints.GET_CURRENT_USER,

          // Options
          {
            // headers injection
            headers: { Authorization: `Bearer ${bearer}` },
            // ask to access a full response(body, headers, status code)
            observe: "response",
          }
        )
    );
  }

  /**
   * Activate user
   *
   * @param activationCode Obtained code in mail after registration
   *
   * @returns Observable on :
   *  - type returned by error if error
   *  - HttpResponse<PublicUserDto> if success
   *
   * @author AtsuhikoMochizuki
   * @date 17-05-2024
   */
  activateUser(activationCode: string): Observable<HttpResponse<string>> {
    return (
      //Envoi de la requête
      this.http

        // Method type whith type of attempted data in body response
        .post<string>(
          // Url
          BackEndPoints.ACTIVATE,

          //Serialized body data
          JSON.stringify({ code: activationCode }),

          //Options
          {
            headers: { "content-type": "application/json" },
            observe: "response",
          }
        )
    );
  }

  /**
   * loginUser user
   *
   * @param emailToSend : string
   * @param passwordToSend : string
   *
   * @returns Observable on HttpResponse<CredentialsDto> that contain jwt & refresh-token
   *
   * @author AtsuhikoMochizuki
   * @date 17-05-2024
   */
  loginUser(
    emailToSend: string,
    passwordToSend: string
  ): Observable<HttpResponse<CredentialsDto>> {
    return (
      //Envoi de la requête
      this.http

        // Method type whith type of attempted data in body response
        .post<CredentialsDto>(
          // Url
          BackEndPoints.SIGN_IN,

          //Serialized body data
          JSON.stringify({
            username: emailToSend,
            password: passwordToSend,
          }),

          //Options
          {
            headers: { "content-type": "application/json" },
            observe: "response",
          }
        )
    );
  }
}
