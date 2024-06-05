import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user-module/user.module';
import { ProtectedNavComponent } from './protected-nav-component/protected-nav.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from "../../shared-module/shared.module";

@NgModule({
    declarations: [
        ProtectedNavComponent,
    ],
    exports: [
        ProtectedNavComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        UserModule,
        RouterModule,
        SharedModule
    ]
})
export class SharedProtectedModule { }
