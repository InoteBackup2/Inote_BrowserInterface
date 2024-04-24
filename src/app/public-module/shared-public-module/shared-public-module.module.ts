import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDemoModeComponentComponent } from './highlight-demo-mode-component/highlight-demo-mode-component.component';
import { PublicNavBarComponentComponent } from './public-nav-bar-component/public-nav-bar-component.component';




@NgModule({
  declarations: [
    HighlightDemoModeComponentComponent,
    PublicNavBarComponentComponent,
    ],
  imports: [
    CommonModule
  ],
  exports : [
    HighlightDemoModeComponentComponent,
    PublicNavBarComponentComponent
  ]
})
export class SharedPublicModuleModule { }
