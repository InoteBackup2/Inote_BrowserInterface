import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWithPopupComponent } from './register-with-popup.component';

describe('RegisterWithPopupComponent', () => {
  let component: RegisterWithPopupComponent;
  let fixture: ComponentFixture<RegisterWithPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterWithPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterWithPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
