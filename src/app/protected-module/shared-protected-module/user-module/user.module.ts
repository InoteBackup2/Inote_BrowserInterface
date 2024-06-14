import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedUserService } from './protected-user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFilterPipe } from './user-filter-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user-component/user.component';
import { SharedModule } from '../../../shared-module/shared.module';

@NgModule({
  declarations: [UserFilterPipe, UserComponent],
  imports: [
    CommonModule,
   FontAwesomeModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  providers:[
    ProtectedUserService
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
