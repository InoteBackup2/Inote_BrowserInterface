import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModuleModule } from './user-module/user-module.module';
import { ProtectedNavComponentComponent } from './protected-nav-component/protected-nav-component.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ 
    ProtectedNavComponentComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    UserModuleModule,
    RouterModule
  ],
  exports:[
    ProtectedNavComponentComponent,
  ]
})
export class SharedProtectedModuleModule { }
