import { Component } from '@angular/core';

@Component({
  selector: 'app-highlight-demo-mode-component',
  template: `
   <p class="clignotement text-success text-center fw-bold mt-2 border border-danger bg-white rounded p-1 fs-6">
                Testez le mode démo <br>
                email : test&#64;inote.fr<br>
                password : test
            </p>
  `,
  styles: `
   .clignotement {
    animation: clignoter 3s linear infinite;
  }
  
  @keyframes clignoter {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }`
  })
export class HighlightDemoModeComponentComponent {

}
