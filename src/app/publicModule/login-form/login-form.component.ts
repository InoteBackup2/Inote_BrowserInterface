import { Component/*, OnInit*/ } from "@angular/core";
import { PublicUserService } from "../public-user.service";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { TokenService } from "../../coreModule/token.service";

interface IToken {
  bearer:string
}

@Component({
  selector: "app-login-form-component",
  templateUrl: "./login-form.component.html",
  styleUrls: [
    "./login-form.component.css",
    "../../sharedModule/general-styles.css",
  ],
})
export class LoginFormComponent/* implements OnInit*/ {
  token!: IToken;
  email!: string;
  password!: string;
  statusAfterRequest!: string;
  msgAfterRequest!: string;

  constructor(
    private publicUserservice : PublicUserService,
    private tokenService : TokenService,
    private router:Router
  ){}

  OnSubmit() {
    console.log(`${this.email}:${this.password}`);
   this.login(this.email, this.password);
  }

  //ngOnInit(): void {}

  private login(email:string, password:string){
    this.publicUserservice.loginUser(email,password).pipe(

      catchError(error => {
        this.statusAfterRequest = error.status;
        this.msgAfterRequest = error.error.detail;
        return throwError(error);
      })
    )
    .subscribe((response) => {
     this.statusAfterRequest = response.status;
     if(response.status=="200"){
        this.tokenService.saveToken(response.body.bearer);
        this.router.navigate(['dashboard']);
      }
    })

  }
}
