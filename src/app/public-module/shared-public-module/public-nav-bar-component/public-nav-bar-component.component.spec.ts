import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNavBarComponentComponent } from './public-nav-bar-component.component';

describe('PublicNavBarComponentComponent', () => {
  let component: PublicNavBarComponentComponent;
  let fixture: ComponentFixture<PublicNavBarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicNavBarComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicNavBarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
