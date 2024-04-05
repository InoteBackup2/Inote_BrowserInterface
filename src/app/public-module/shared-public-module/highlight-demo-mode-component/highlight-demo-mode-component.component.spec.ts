import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightDemoModeComponentComponent } from './highlight-demo-mode-component.component';

describe('HighlightDemoModeComponentComponent', () => {
  let component: HighlightDemoModeComponentComponent;
  let fixture: ComponentFixture<HighlightDemoModeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightDemoModeComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighlightDemoModeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
