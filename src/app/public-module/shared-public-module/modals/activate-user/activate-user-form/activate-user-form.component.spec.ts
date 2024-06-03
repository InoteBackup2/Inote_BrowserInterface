import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUserFormComponent } from './activate-user-form.component';

describe('ActivateUserFormComponent', () => {
  let component: ActivateUserFormComponent;
  let fixture: ComponentFixture<ActivateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivateUserFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
