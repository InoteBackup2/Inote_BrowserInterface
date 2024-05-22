import { Component, OnInit } from '@angular/core';
import { User } from '../shared-protected/user/user';

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
