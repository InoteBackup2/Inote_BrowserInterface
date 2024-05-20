import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDto } from './user.dto';
import { HttpRespMsgDto} from './ResponseMsg.dto';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: 'UserDto', useValue: UserDto },
    { provide: 'HttpRespMsgDto', useValue: HttpRespMsgDto }
  ],
  exports: [
    
  ]
})
export class DtoModule { }
