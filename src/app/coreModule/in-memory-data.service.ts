import { Injectable } from '@angular/core';
import { InMemoryDbService/*, RequestInfo*/ } from 'angular-in-memory-web-api';
import { USERS } from '../protectedModule/sharedProtectedModule/userModule/mock-user-list';

@Injectable({
  providedIn: 'root'  // disponible dans toute l'application
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const users = USERS;
    return {users};
  }
}
