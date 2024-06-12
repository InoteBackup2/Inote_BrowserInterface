import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styles: ``
})
export class UserManagementComponent implements OnInit{

  usernameToSend!: string;
  
  ngOnInit(): void {
    this.usernameToSend = "mochizuki@inote.fr";
  }
}
