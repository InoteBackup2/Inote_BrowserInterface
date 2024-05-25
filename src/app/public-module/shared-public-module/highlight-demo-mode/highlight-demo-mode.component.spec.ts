import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightDemoModeComponent } from './highlight-demo-mode.component';

describe('HighlightDemoModeComponent', () => {
  let component: HighlightDemoModeComponent;
  let fixture: ComponentFixture<HighlightDemoModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightDemoModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighlightDemoModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
