import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicUserDto } from './public-user-dto.dto';
import { CredentialsDto } from './credentials-dto.dto';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: 'PublicUserDto', useValue: PublicUserDto },
    { provide: 'CredentialsDto', useValue: CredentialsDto },
    
  ],
})
export class DtoModuleModule { }
