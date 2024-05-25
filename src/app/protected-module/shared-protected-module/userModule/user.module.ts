import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../../../shared-module/shared.module';
import { SearchUserComponent } from './search-user/search-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFilterPipe } from './user-filter-pipe.pipe';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserListComponent,
    SearchUserComponent,
    UserFilterPipe,
    UserDetailsComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent
  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
