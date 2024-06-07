import { Component } from '@angular/core';
import { Msg } from '../../shared-module/constants/messages.constant';
import { LanguageManagerService } from '../../shared-module/services/language-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  // RELATING TEMPLATE VARIABLES
  // ==============================================
  accountCreationPath:string=Msg.webpage_staticText.register.ACCOUNT_CREATION;

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    public lang: LanguageManagerService
  ) {}
}
