import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderMouseDirective } from './border-mouse.directive';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { BorderMouseNoInitialColorDirectiveDirective } from './border-mouse-no-initial-color-directive.directive';
import { SpinLoaderComponentComponent } from './spin-loader-component/spin-loader-component.component';
import { SharedComponentComponent } from './shared-component/shared-component.component';
import { DtoModuleModule } from './dto-module/dto-module.module';
@NgModule({
  declarations: [
    BorderMouseDirective,
    FooterComponentComponent,
    BorderMouseNoInitialColorDirectiveDirective,
    SpinLoaderComponentComponent,
    SharedComponentComponent,
    
  ],
  imports: [
    CommonModule,
    DtoModuleModule
     ],
  exports:[
    FooterComponentComponent,
    BorderMouseDirective,
    BorderMouseNoInitialColorDirectiveDirective,
    SpinLoaderComponentComponent,
    SharedComponentComponent,
  ],

})
export class SharedModuleModule { }
