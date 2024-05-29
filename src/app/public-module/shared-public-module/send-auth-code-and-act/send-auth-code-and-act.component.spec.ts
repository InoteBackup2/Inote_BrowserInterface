import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAuthCodeAndActComponent } from './send-auth-code-and-act.component';

describe('SendAuthCodeAndActComponent', () => {
  let component: SendAuthCodeAndActComponent;
  let fixture: ComponentFixture<SendAuthCodeAndActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendAuthCodeAndActComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendAuthCodeAndActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
