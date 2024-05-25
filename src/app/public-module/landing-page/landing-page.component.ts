import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-component',
  templateUrl: './landing-page.component.html',
  styleUrls: [
    './landing-page.component.css',
    '../../shared-module/shared/shared.component.css'
  ]
})
export class LandingPageComponent {

  constructor(private router: Router) { }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  goToSubscribePage() {
   this.router.navigate(['register']);
  }
}
