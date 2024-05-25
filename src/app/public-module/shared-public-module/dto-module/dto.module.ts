import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicUserDto } from './public-user.dto';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // 'NewPublicUserRequestDto' only refers to a type, but is being used as a value here
    // { provide: 'PublicUserDto', useValue: NewPublicUserRequestDto },
    { provide: 'PublicUserDto', useValue: PublicUserDto },
  ],
})
export class DtoModule { }
