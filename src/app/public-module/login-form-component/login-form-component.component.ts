import { Component, OnInit } from "@angular/core";
import { PublicUserService } from "../public-user.service";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

@Component({
  selector: "app-login-form-component",
  templateUrl: "./login-form-component.component.html",
  styleUrls: [
    "./login-form-component.component.css",
    "../../shared-module/general-styles.css",
  ],
})
export class LoginFormComponentComponent implements OnInit {
  email!: string;
  password!: string;
  statusAfterRequest!: string;
  msgAfterRequest!: string;

  constructor( 
    private publicUserservice : PublicUserService,
    private router:Router
  ){}

  OnSubmit() {
    console.log(`${this.email}:${this.password}`);
   this.login(this.email, this.password);
  }

  ngOnInit(): void {}

  private login(email:string, password:string){
    this.publicUserservice.loginUser(email,password).pipe(

      catchError(error => {
        this.statusAfterRequest = error.status;
        this.msgAfterRequest = error.error.msg;
        return throwError(error);
      })
    )
    .subscribe(response => {
      console.log(response.body.bearer);
      this.statusAfterRequest = response.status;
      // const object : Object = response.body.msg;
      if(this.statusAfterRequest=="200"){
      
      }
    })

  }
}
