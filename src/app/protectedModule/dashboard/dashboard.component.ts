import { Component/*, OnInit*/ } from '@angular/core';
//import { PublicUserService } from '../../public-module/public-user.service';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent /*implements OnInit*/{

  pseudo!:string;
  
  constructor(/*userService:PublicUserService*/){

  }
  
  /*
  ngOnInit(): void {
   
  }
  */

}
