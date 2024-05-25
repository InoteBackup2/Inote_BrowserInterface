import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicNavBarComponent } from './public-nav-bar/public-nav-bar.component';
import { DtoModule } from './dto-module/dto.module';
import { PublicUserService } from '../public-user.service';
import { BackEndPoints } from './back-end-points.enum';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
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
   PublicNavBarComponent
  ]
})
export class SharedPublicModule { }
