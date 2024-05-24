import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form-component',
  templateUrl: './user-form.component.html',
  styleUrl: 'user-form.component.css'
})
export class UserFormComponent implements OnInit {
  @Input() user!: User;
  isAddForm!: boolean;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.isAddForm = this.router.url.includes('add');
  }

  onSubmit() {
    console.log(this.user.avatar);

    if (this.isAddForm) {
      this.userService.addUser(this.user)
        .subscribe((user: User) => this.router.navigate(['/user', user.id]), (error) => console.error(error));
    } else {
      this.userService.updateUser(this.user)
        .subscribe(() => this.router.navigate(['/user', this.user.id]), (error) => console.error(error));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onload = (event: any) => {
      const image = document.getElementById('avatar') as HTMLImageElement;
      image.src = event.target.result;
      this.user.picture = image.src;
    };

    reader.readAsDataURL(file);
  }
}
