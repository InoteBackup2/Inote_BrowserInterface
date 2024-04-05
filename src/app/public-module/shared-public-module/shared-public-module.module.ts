import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDemoModeComponentComponent } from './highlight-demo-mode-component/highlight-demo-mode-component.component';



@NgModule({
  declarations: [
    HighlightDemoModeComponentComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HighlightDemoModeComponentComponent
  ]
})
export class SharedPublicModuleModule { }
