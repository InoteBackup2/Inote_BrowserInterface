import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderMouseDirective } from './border-mouse.directive';
import { FooterComponent } from './footer/footer.component';
import { BorderMouseNoInitialColorDirective } from './border-mouse-no-initial-color.directive';
import { SpinLoaderComponent } from './spin-loader/spin-loader.component';
import { SharedComponent } from './shared/shared.component';
@NgModule({
  declarations: [
    BorderMouseDirective,
    FooterComponent,
    BorderMouseNoInitialColorDirective,
    SpinLoaderComponent,
    SharedComponent,
    
  ],
  imports: [
    CommonModule],
  exports:[
    FooterComponent,
    BorderMouseDirective,
    BorderMouseNoInitialColorDirective,
    SpinLoaderComponent,
    SharedComponent,
  ],

})
export class SharedModule { }
