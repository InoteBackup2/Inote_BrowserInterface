import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user-module/user.module';
import { ProtectedNavComponent } from './protected-nav/protected-nav.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ProtectedNavComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    UserModule,
    RouterModule
  ],
  exports:[
    ProtectedNavComponent,
  ]
})
export class SharedProtectedModule { }
