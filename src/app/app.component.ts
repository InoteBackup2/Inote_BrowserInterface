import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'Inote Web Interface';

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    
    AOS.init();
  }
}
