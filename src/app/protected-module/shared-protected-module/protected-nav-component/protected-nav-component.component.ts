import { Component, OnInit } from '@angular/core';
import { faCoffee, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-protected-nav-component',
  templateUrl: './protected-nav-component.component.html',
  styles: `
  
  `
})
export class ProtectedNavComponentComponent implements OnInit{

  requestedSearch!:boolean;
  faMagnifyingGlass = faMagnifyingGlass;

  ngOnInit(): void {
      this.requestedSearch = false;
  }
  onSearchRequested() {
    this.requestedSearch= !this.requestedSearch;
  }
}
