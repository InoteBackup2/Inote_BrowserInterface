import { Component/*, OnInit*/ } from '@angular/core';
import { PublicUserDto } from '../shared-public-module/dto-module/public-user-dto.dto';
import { PublicUserService } from '../public-user.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register-form-component',
  templateUrl: './register-form-component.component.html',
  styleUrls: ['./register-form-component.component.css', '../../shared-module/general-styles.css']
})
export class RegisterFormComponentComponent/* implements OnInit*/ {


  // Forms Fields
  email!: string;
  password!: string;
  pseudonyme!: string;
  activationcode!: string;
  
  registering_success: boolean = false;
  activation_success: boolean = false;

  userToRegister!: PublicUserDto;

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

  registerUser(user: PublicUserDto) {
    this.publicUserService.addUser(user).subscribe(
      response => {
        this.statusAfterRegisterRequest = response.status;
        this.msgAfterRegisterRequest = response.body.msg;
        this.registering_success=true;
      },
    error => {
      this.statusAfterRegisterRequest = error.status;
        this.msgAfterRegisterRequest = error.error.msg;
        return throwError(error);
    })
  }

  activateUser(activationCode:string){
    this.publicUserService.activateUser(activationCode).pipe(
      catchError(error => {
        this.statusAfterActivationRequest = error.status;
        this.msgAfterActivationRequest = error.error.msg;
        return throwError(error);
      })
    )
    .subscribe(response => {
      this.statusAfterActivationRequest = response.status;
      this.msgAfterActivationRequest = response.body.msg;
      this.activation_success=true;
    })
  }

  OnSubmit() {
    this.registerUser(
      new PublicUserDto(this.pseudonyme, this.email, this.password)
    );
  }

  OnSubmitActivation() {
    
    this.activateUser(this.activationcode);
  }

  goToHome() {
    this.router.navigate(['']);
  }
}
