import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicNavBarComponent } from './public-nav-bar/public-nav-bar.component';
import { PublicUserService } from '../public-user.service';
import { BackEndPoints } from './back-end-points.enum';
import { RouterModule } from '@angular/router';
import { SendAuthCodeAndActComponent } from './send-auth-code-and-act/send-auth-code-and-act.component';
import { ActivateUserFormComponent } from './modals/activate-user/activate-user-form/activate-user-form.component';


@NgModule({
  declarations: [
    PublicNavBarComponent,
    SendAuthCodeAndActComponent,
    ActivateUserFormComponent
    ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  providers:[
    PublicUserService,
    {provide: 'BackendEndPoints', useValue: BackEndPoints }
  ],
  exports : [
   PublicNavBarComponent,
   SendAuthCodeAndActComponent,
   ActivateUserFormComponent
  ]
})
export class SharedPublicModule { }
