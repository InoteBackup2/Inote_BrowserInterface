import { Component, OnInit } from '@angular/core';
import { /*faCoffee, */faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { PublicUserDto } from '../user-module/public-user-dto.dto';
//import { Observable } from 'rxjs';
import { UserService } from '../user-module/user.service';
import { TokenService } from '../../../core-module/token.service';

@Component({
  selector: 'app-protected-nav-component',
  templateUrl: './protected-nav-component.component.html',
  styles: `
  
  `
})
export class ProtectedNavComponentComponent implements OnInit{

  requestedSearch!:boolean;
  faMagnifyingGlass = faMagnifyingGlass;

  publicUserDto! : PublicUserDto;
  token! : string|null;

  jsonData: any;

  constructor(
    private userService:UserService,
    private tokenService: TokenService){}

  ngOnInit(): void {
      this.token = this.tokenService.getToken();
      if(this.token !== null){
        this.userService.getCurrentUser(this.token).subscribe(
          response => {
             this.jsonData = response;
             this.publicUserDto = this.jsonData.data;
             

            
          })
      }
      else{ 
        throw Error("Authentication token could not be recovered");
      }
      
      this.requestedSearch = false;

     
  }
  onSearchRequested() {
    this.requestedSearch= !this.requestedSearch;
  }
}
