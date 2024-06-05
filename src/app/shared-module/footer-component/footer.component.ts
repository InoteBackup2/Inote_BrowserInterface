import { Component } from '@angular/core';
import { Msg } from '../constants/messages.constant';
import { LanguageManagerService } from '../services/language-manager.service';

@Component({
  selector: 'app-footer-component',
  templateUrl: 'footer.component.html',
  styleUrl: 'footer.component.css'
})
export class FooterComponent {

  // RELATING TEMPLATE VARIABLES
  // ==============================================
  siteSectionsPath:string=Msg.footer.WEBSITE_SECTIONS;
  contactPath:string=Msg.footer.CONTACT;
  termsAndConditionsPath:string=Msg.footer.TERMS_AND_CONDITIONS;
  privacyAndSecurityPath:string=Msg.footer.PRIVACY_AND_SECURITY;
  cookiesPath:string=Msg.footer.COOKIES;
  followUsPath:string=Msg.footer.FOLLOW_US_ON_SOCIAL_NETWORKS;
  

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    public lang: LanguageManagerService
  ) {}

}
