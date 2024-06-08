import { Component, OnInit } from '@angular/core';
import { Msg } from '../constants/messages.constant';
import { LanguageManagerService } from '../services/language-manager.service';
import { faInstagram, faLinkedin,faFacebook,faTwitter } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-footer-component',
  templateUrl: 'footer.component.html',
  styleUrls: ['../../../styles.css']
})
export class FooterComponent implements OnInit{

  // RELATING TEMPLATE VARIABLES
  // ==============================================
  siteSectionsPath:string=Msg.webpage_staticText.footer.WEBSITE_SECTIONS;
  contactPath:string=Msg.webpage_staticText.footer.CONTACT;
  termsAndConditionsPath:string=Msg.webpage_staticText.footer.TERMS_AND_CONDITIONS;
  privacyAndSecurityPath:string=Msg.webpage_staticText.footer.PRIVACY_AND_SECURITY;
  cookiesPath:string=Msg.webpage_staticText.footer.COOKIES;
  followUsPath:string=Msg.webpage_staticText.footer.FOLLOW_US_ON_SOCIAL_NETWORKS;
  allReservedRightsPath: string=Msg.webpage_staticText.footer.ALL_RIGTHS_RESERVED;

  currentDate!:string;
  
  // Icons
  faInstagram=faInstagram;
  faTwitter=faTwitter;
  faFacebook=faFacebook;
  faLinkedin=faLinkedin;
  

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    public lang: LanguageManagerService
  ) {}

   // INITIALIZATION (by ngOnInit)
  // ==============================================
  ngOnInit(): void {
   this.currentDate = new Date().toLocaleDateString();
  }

}
