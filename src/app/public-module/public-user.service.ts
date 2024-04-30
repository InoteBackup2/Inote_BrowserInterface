import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../shared-module/dto-module/user.dto';
import { HttpRespMsgDto } from '../shared-module/dto-module/ResponseMsg.dto';
@Injectable({
  providedIn: 'root'
})
export class PublicUserService {


  constructor(private http: HttpClient) { }

  

  addUser(user: UserDto): Observable<any> {
    const headers = { 'content-type': 'application/json' };  // because we send JSON
    const body = JSON.stringify(user);
    return this.http.post<any>("http://localhost:8080/api/auth/register",
      body, { 'headers': headers, reportProgress: true, observe: 'response' });
  }
}
