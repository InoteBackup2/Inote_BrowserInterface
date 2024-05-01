import { Component, OnInit } from '@angular/core';
import { PublicUserDto } from '../shared-public-module/dto-module/public-user-dto.dto';
import { PublicUserService } from '../public-user.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form-component',
  templateUrl: './register-form-component.component.html',
  styleUrl: './register-form-component.component.css'
})
export class RegisterFormComponentComponent implements OnInit {

  // Forms Fields
  email!: string;
  password!: string;

  registering_success: boolean = false;
  userToRegister!: PublicUserDto;

  // Http response variables 
  msgAfterRequest!: string;
  statusAfterRequest!: number;

  constructor(
      private publicUserService: PublicUserService,
      private router:Router) { }

  ngOnInit(): void { }

  registerUser(user: PublicUserDto) {
    this.publicUserService.addUser(user).pipe(
      catchError(error => {
        this.statusAfterRequest = error.status;
        this.msgAfterRequest = error.error.msg;
        return throwError(error);
      })
    )
      .subscribe(response => {
        this.statusAfterRequest = response.status;
        this.msgAfterRequest = response.body.msg;
        this.registering_success=true;
      })
  }

  OnSubmit() {
    this.registerUser(
      new PublicUserDto("default", this.email, this.password)
    );
  }

  goToHome() {
    this.router.navigate(['']);
  }
}
