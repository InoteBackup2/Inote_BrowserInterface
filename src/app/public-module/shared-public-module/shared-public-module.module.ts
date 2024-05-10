import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDemoModeComponentComponent } from './highlight-demo-mode-component/highlight-demo-mode-component.component';
import { PublicNavBarComponentComponent } from './public-nav-bar-component/public-nav-bar-component.component';
import { DtoModuleModule } from './dto-module/dto-module.module';
import { PublicUserService } from '../public-user.service';
import {BackEndPoints} from './back-end-points.constants';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../../shared-module/shared-module.module';




@NgModule({
  declarations: [
    HighlightDemoModeComponentComponent,
    PublicNavBarComponentComponent,
    ],
  imports: [
    RouterModule,
    CommonModule,
    DtoModuleModule
  ],
  providers:[
    PublicUserService,
    {provide: 'BackendEndPoints', useValue: BackEndPoints }
  ],
  exports : [
    HighlightDemoModeComponentComponent,
    PublicNavBarComponentComponent
  ]
})
export class SharedPublicModuleModule { }
