import { Component} from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
    styleUrls: [
    '../../shared-module/shared/shared.component.css'
  ]
})
export class LoginComponent{
  message: string = "Vous êtes déconnecté";

  userDemo: string = "a@a.com";
  userPwdDemo: string = 'a';
  name!: string;
  password!: string;
  

  constructor(private router: Router) {}
}
