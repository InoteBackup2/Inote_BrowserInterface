import { Component, OnInit } from '@angular/core';
import { User } from '../sharedProtectedModule/userModule/user';

@Component({
  selector: 'app-view-user-add-component',
  templateUrl: 'view-user-add.component.html'
})
export class ViewUserAddComponent implements OnInit {
  user!: User;

  ngOnInit(): void {
    this.user = new User();
  }
}
