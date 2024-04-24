import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-component',
  templateUrl: './landing-page-component.component.html',
  styleUrls: [
    './landing-page-component.component.css',
    '../../shared-module/shared-component/shared-component.component.css'
  ]
})
export class LandingPageComponentComponent {


  constructor(private router: Router) { }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  goToSubscribePage() {
   this.router.navigate(['subscribe']);
  }
}
