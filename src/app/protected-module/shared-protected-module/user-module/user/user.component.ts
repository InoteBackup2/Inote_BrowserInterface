import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent implements OnInit {
  user!: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {

    /* RÃ©cupÃ©ration de l'id indiquÃ© dans la route courante */
    const userId: string | null = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.userService.getUserById(+userId).subscribe(user=>this.user = user);
    }
  }

 deleteUser(user:User){
    // this.userService.deleteUserById(user.id)
    // .subscribe(()=>this.goToUserList());
  }

  goToUserList() {
    // this.router.navigate(['/users']);
  }

  gotToEditUser(user: User) {
    // this.router.navigate(['/edit/user/', user.id])
  }
}

