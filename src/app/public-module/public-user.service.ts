import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicUserDto } from './shared-public-module/dto-module/public-user-dto.dto';
import { BackEndPoints } from './shared-public-module/back-end-points.constants';

@Injectable()
export class PublicUserService {
  constructor(private http: HttpClient) { }

  addUser(user: PublicUserDto): Observable<any> {
    const headers  = { 'content-type': 'application/json' };  // because we send JSON
    const body:string  = user.serializedData();
    return this.http.post<any>(BackEndPoints.REGISTER,
      user.serializedData(), { 'headers': headers, reportProgress: true, observe: 'response' });
  }
}
