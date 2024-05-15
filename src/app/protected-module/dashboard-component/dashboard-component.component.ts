import { Component/*, OnInit*/ } from '@angular/core';
import { PublicUserService } from '../../public-module/public-user.service';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.css'
})
export class DashboardComponentComponent /*implements OnInit*/{

  pseudo!:string;
  
  constructor(/*userService:PublicUserService*/){

  }
  
  /*
  ngOnInit(): void {
   
  }
  */

}
