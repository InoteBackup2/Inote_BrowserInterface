import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import type {
  NewPublicUserRequestDto
} from './sharedPublicModule/dto/public-user.dto';
import { BackEndPoints } from "./sharedPublicModule/back-end-points.enum";



@Injectable()
export class PublicUserService {

  constructor(private http: HttpClient) {}

  addUser(user: NewPublicUserRequestDto): Observable<HttpResponse<{msg: string}>> {
    const headers = { "content-type": "application/json" }; // because we send JSON
    return this.http.post<{msg: string}>(
      BackEndPoints.REGISTER,
      JSON.stringify(user),
      {
        headers: headers,
        reportProgress: true,
        observe: "response",
      }
    );
  }

  activateUser(activationCode: string): Observable<HttpResponse<{msg: string}>> {
    const headers = { "content-type": "application/json" }; // because we send JSON

    return this.http.post<{msg: string}>(
      BackEndPoints.ACTIVATE,
      JSON.stringify({ code: activationCode }),
      { headers: headers, reportProgress: true, observe: "response" }
    );
  }



  loginUser(
    emailToSend: string,
    passwordToSend: string
  ): Observable<any> {
    const headers = { "content-type": "application/json" };
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
