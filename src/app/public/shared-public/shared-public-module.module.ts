import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDemoModeComponent } from './highlight-demo-mode/highlight-demo-mode.component';
import { PublicNavBarComponent } from './public-nav-bar/public-nav-bar.component';
import { DtoModule } from './dto/dto.module';
import { PublicUserService } from '../public-user.service';
import { BackEndPoints } from './back-end-points.enum';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HighlightDemoModeComponent,
    PublicNavBarComponent,
    ],
  imports: [
    RouterModule,
    CommonModule,
    DtoModule
  ],
  providers:[
    PublicUserService,
    {provide: 'BackendEndPoints', useValue: BackEndPoints }
  ],
  exports : [
    HighlightDemoModeComponent,
    PublicNavBarComponent
  ]
})
export class SharedPublicModule { }
