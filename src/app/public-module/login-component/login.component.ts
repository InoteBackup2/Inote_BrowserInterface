import { Component} from '@angular/core';
import { Msg } from '../../shared-module/constants/messages.constant';
import { LanguageManagerService } from '../../shared-module/services/language-manager.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html'
})
export class LoginComponent{
   // RELATING TEMPLATE VARIABLES
  // ==============================================
  connectionPath:string=Msg.webpage_staticText.signIn.CONNECTION;


  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    public lang: LanguageManagerService
  ) {}
}
