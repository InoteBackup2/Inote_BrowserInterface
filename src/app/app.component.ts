import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'inote-web-interface';

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    
    AOS.init();
  }
}
