import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import type {
  PublicUserDtoRequest
} from './shared-public-module/dto/public-user.dto';
import { BackEndPoints } from "./shared-public-module/back-end-points.enum";
import { ActivationCodeDtoRequest } from "./shared-public-module/dto/activation-code.dto";



@Injectable()
export class PublicUserService {

  constructor(private http: HttpClient) {}

  addUser(user: PublicUserDtoRequest): Observable<HttpResponse<string>> {
    const headers = { "content-type": "application/json" }; // because we send JSON
    return this.http.post<string>(
      BackEndPoints.REGISTER,
      JSON.stringify(user),
      {
        headers: headers,
        reportProgress: true,
        observe: "response",
      }
    );
  }

  activateUser(activationCode: ActivationCodeDtoRequest): Observable<HttpResponse<string>> {
    const headers = { "content-type": "application/json" }; // because we send JSON

    return this.http.post<string>(
      BackEndPoints.ACTIVATE,
      JSON.stringify(activationCode),
      { headers: headers, reportProgress: true, observe: "response"}
      
    );
  }



  loginUser(
    emailToSend: string,
    passwordToSend: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<any> {
    const headers = { "content-type": "application/json" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.post<any>(
      BackEndPoints.SIGN_IN,
      JSON.stringify({
        username: emailToSend,
        password: passwordToSend,
      }),
      { headers: headers, reportProgress: true, observe: "response" }
    );
  }
}
