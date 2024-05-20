import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PublicUserDto } from "./shared-public/dto/public-user.dto";
import { BackEndPoints } from "./shared-public/back-end-points.enum";



@Injectable()
export class PublicUserService {  
  
  constructor(private http: HttpClient) {}

  addUser(user: PublicUserDto): Observable<any> {
    const headers = { "content-type": "application/json" }; // because we send JSON
    //const body: string = user.serializedData();
    return this.http.post<any>(BackEndPoints.REGISTER, user.serializedData(), {
      headers: headers,
      reportProgress: true,
      observe: "response",
    });
  }

  activateUser(activationCode: string): Observable<any> {
    const headers = { "content-type": "application/json" }; // because we send JSON

    return this.http.post<any>(
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
