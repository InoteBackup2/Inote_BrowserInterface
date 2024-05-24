import { Component/*, OnInit*/ } from '@angular/core';
import type {
  NewPublicUserRequestDto
} from '../sharedPublicModule/dto/public-user.dto';
import { PublicUserService } from '../public-user.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register-form-component',
  templateUrl: './register-form.component.html',
  styleUrls: [
    './register-form.component.css',
    '../../sharedModule/general-styles.css'
  ]
})
export class RegisterFormComponent/* implements OnInit*/ {

  // Forms Fields
  email!: string;
  password!: string;
  pseudonyme!: string;
  activationcode!: string;

  registering_success: boolean = false;
  activation_success: boolean = false;

  userToRegister!: NewPublicUserRequestDto;

  // Http response variables
  msgAfterRegisterRequest!: string;
  statusAfterRegisterRequest!: number;

  msgAfterActivationRequest!: string;
  statusAfterActivationRequest!: number;

  constructor(
      private publicUserService: PublicUserService,
      private router:Router) { }

  //ngOnInit(): void { }

  // registerUser(user: PublicUserDto) {
  //   this.publicUserService.addUser(user).pipe(
  //     catchError(error => {
  //       this.statusAfterRegisterRequest = error.status;
  //       this.msgAfterRegisterRequest = error.error.msg;
  //       return throwError(error);
  //     })
  //   )
  //     .subscribe(response => {
  //       this.statusAfterRegisterRequest = response.status;
  //       this.msgAfterRegisterRequest = response.body.msg;
  //       this.registering_success=true;
  //     })
  // }

  registerUser(user: NewPublicUserRequestDto) {
    this.publicUserService.addUser(user).subscribe(
      response => {
        if (response.body !== null) {
          this.statusAfterRegisterRequest = response.status;
          this.msgAfterRegisterRequest = response.body.msg;
          this.registering_success=true;
        }
        else {
          throw new Error('Public user HTTP body needed');
        }
      },
    error => {
      this.statusAfterRegisterRequest = error.status;
        this.msgAfterRegisterRequest = error.error.msg;
        return throwError(error);
    })
  }

  activateUser(activationCode: string){
    this.publicUserService.activateUser(activationCode).pipe(
      catchError(error => {
        this.statusAfterActivationRequest = error.status;
        this.msgAfterActivationRequest = error.error.msg;
        return throwError(error);
      })
    )
    .subscribe(response => {
      if (response.body !== null) {
        this.statusAfterActivationRequest = response.status;
        this.msgAfterActivationRequest = response.body.msg;
        this.activation_success=true;
      }
    })
  }

  OnSubmit() {
    const newPublicUserRequestDto: NewPublicUserRequestDto = {
      NAME: this.pseudonyme,
      USER_NAME: this.email,
      PASSWORD: this.password
    };
    this.registerUser(newPublicUserRequestDto);
  }

  OnSubmitActivation() {

    this.activateUser(this.activationcode);
  }

  goToHome() {
    this.router.navigate(['']);
  }
}
