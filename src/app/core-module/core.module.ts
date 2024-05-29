import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './token.service';

@NgModule({
  providers: [TokenService],
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[]
})
export class CoreModule { }
