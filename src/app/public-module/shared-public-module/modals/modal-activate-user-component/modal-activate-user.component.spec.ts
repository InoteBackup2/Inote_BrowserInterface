import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActivateUserComponent } from './modal-activate-user.component';

describe('ModalActivateUserComponent', () => {
  let component: ModalActivateUserComponent;
  let fixture: ComponentFixture<ModalActivateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalActivateUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalActivateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
