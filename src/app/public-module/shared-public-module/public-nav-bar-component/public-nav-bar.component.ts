import { Component } from "@angular/core";
import { LanguageManagerService } from "../../../shared-module/services/language-manager.service";
import { Msg } from "../../../shared-module/constants/messages.constant";
import { Router } from "@angular/router";
import { Urn } from "../../../shared-module/enums/urn.enum";

@Component({
  selector: "app-public-nav-bar-component",
  templateUrl: "./public-nav-bar.component.html",
  styleUrl:"../../../../styles.css"
})
export class PublicNavBarComponent {

  // RELATING TEMPLATE VARIABLES
  // ==============================================
  signInPath: string = Msg.publicNavBar.SIGN_IN;
  
  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(public lang: LanguageManagerService,
    private router:Router
  ) {}

  onLogin() {
    this.router.navigate([Urn.SIGN_IN]);
  }
}
