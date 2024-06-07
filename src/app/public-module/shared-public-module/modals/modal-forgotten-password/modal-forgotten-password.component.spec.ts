import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForgottenPasswordComponent } from './modal-forgotten-password.component';

describe('ModalForgottenPasswordComponent', () => {
  let component: ModalForgottenPasswordComponent;
  let fixture: ComponentFixture<ModalForgottenPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalForgottenPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalForgottenPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
