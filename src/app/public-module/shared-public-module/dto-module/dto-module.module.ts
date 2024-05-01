import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicUserDto } from './public-user-dto.dto';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: 'PublicUserDto', useValue: PublicUserDto },
  ],
})
export class DtoModuleModule { }
