import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedUserService } from './protected-user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFilterPipe } from './user-filter-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserFilterPipe],
  imports: [
    CommonModule,
   FontAwesomeModule,
    FormsModule,
    RouterModule
  ],
  providers:[
    ProtectedUserService
  ]
})
export class UserModule { }
