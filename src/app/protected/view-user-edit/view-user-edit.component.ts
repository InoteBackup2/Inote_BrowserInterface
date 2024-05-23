import { Component, OnInit } from '@angular/core';
import { User } from '../shared-protected/user/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared-protected/user/user.service';

@Component({
  selector: 'app-view-user-edit-component',
  templateUrl: 'view-user-edit.component.html'
})
export class ViewUserEditComponent implements OnInit {
  user!: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId: string | null = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(+userId).subscribe(user => this.user = user);
    } else {
      this.user = undefined;
    }
  }
}
