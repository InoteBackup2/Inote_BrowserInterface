import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import type { NewPublicUserResponseDto } from '../user-module/public-user.dto';
import { UserService } from '../user-module/user.service';
import { TokenService } from '../../../core-module/token.service';

@Component({
  selector: 'app-protected-nav-component',
  templateUrl: './protected-nav.component.html',
  styleUrls: ['./protected-nav.component.css']
})
export class ProtectedNavComponent implements OnInit {

  requestedSearch!:boolean;
  faMagnifyingGlass = faMagnifyingGlass;

  publicUserDto! : NewPublicUserResponseDto;
  token! : string|null;

  constructor(
    private userService: UserService,
    private tokenService: TokenService){}

  ngOnInit(): void {
      this.token = this.tokenService.getToken();
      if(this.token){
        this.userService.getCurrentUser(this.token).subscribe(
          response => {
            if (response.body) {
              this.publicUserDto = response.body;
            }
            else {
              throw new Error('HTTP body hasn\'t to be null');
            }
          })
      }
      else{
        throw new Error("Authentication token could not be recovered");
      }

      this.requestedSearch = false;
  }

  onSearchRequested() {
    this.requestedSearch= !this.requestedSearch;
  }
}
