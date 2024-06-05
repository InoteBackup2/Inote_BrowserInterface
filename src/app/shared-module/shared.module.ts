import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderMouseDirective } from './directives/border-mouse.directive';
import { FooterComponent } from './footer-component/footer.component';
import { BorderMouseNoInitialColorDirective } from './directives/border-mouse-no-initial-color.directive';
import { SpinLoaderComponent } from './spin-loader-component/spin-loader.component';
import { LanguageSelectorComponent } from './language-selector-component/language-selector.component';

@NgModule({
  declarations: [
    BorderMouseDirective,
    FooterComponent,
    BorderMouseNoInitialColorDirective,
    SpinLoaderComponent,
    LanguageSelectorComponent
    ],
  imports: [
    CommonModule,],
  exports:[
    FooterComponent,
    BorderMouseDirective,
    BorderMouseNoInitialColorDirective,
    SpinLoaderComponent,
    LanguageSelectorComponent
  ],

})
export class SharedModule { }
