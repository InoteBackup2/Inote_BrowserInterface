import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Urn } from '../../shared-module/enums/urn.enum';
import { LanguageManagerService } from '../../shared-module/services/language-manager.service';
import { Msg} from '../../shared-module/constants/messages.constant';

@Component({
  selector: 'app-landing-page-component',
  templateUrl: './landing-page.component.html',
  styleUrls: [
    './landing-page.component.css'
  ]
})
export class LandingPageComponent {

  // RELATING TEMPLATE VARIABLES
  // ==============================================
  sloganPath:string=Msg.landing_page.SLOGAN;
  shortDescriptionPath:string=Msg.landing_page.SHORT_DESCRIPTION;
  quickRegistrationPath:string=Msg.landing_page.QUICK_REGISTRATION;
  
  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    private router: Router,
  public lang:LanguageManagerService) { }
 
  // TEMPLATE CALLBACKS METHODS
  // ==============================================

  goToLoginPage() {
    this.router.navigate([Urn.SIGN_IN]);
  }

  goToSubscribePage() {
   this.router.navigate([Urn.REGISTER]);
  }
}
