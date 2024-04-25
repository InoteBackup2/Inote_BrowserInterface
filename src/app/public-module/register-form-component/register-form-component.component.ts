import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form-component',
  templateUrl: './register-form-component.component.html',
  styleUrl: './register-form-component.component.css'
})
export class RegisterFormComponentComponent implements OnInit{
  
  submittedForm!:boolean;
  email!: String;
  password!: String;

  constructor(){}
  
  ngOnInit(): void {
    this.submittedForm = false;
    this.email = "";
    this.password="";
  }

  OnSubmit(){
    console.log(this.email);
    console.log('Submited form');
    this.submittedForm = true;
    
  }

}
