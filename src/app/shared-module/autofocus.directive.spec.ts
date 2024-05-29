import { Component, ElementRef } from '@angular/core';
import { AutofocusDirective } from './autofocus.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: '<input id="test-input" appAutofocus>'
}) class MockComponent{}

let fixture: ComponentFixture<MockComponent>;
let inputElement: HTMLInputElement;

describe('AutofocusDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AutofocusDirective,
        MockComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();

    const newElement: HTMLInputElement | null =
        fixture.debugElement.query(By.css('input')).nativeElement;
    
    if (newElement) {
      inputElement = newElement;
    } else {
      throw new Error('Can\'t test without input element !');
    }
  });

  it('should create an instance', () => {
    const inputRef = new ElementRef(inputElement);
    const directive = new AutofocusDirective(inputRef);
    expect(directive).toBeTruthy();
  });

  it('creates a focused input when autofocus is true', () => {
    inputElement.setAttribute('appAutofocus', 'true');
    fixture.detectChanges();

    expect(inputElement.autofocus).toBe(true);
  });

  it('creates a unfocused input when autofocus is false', () => {
    inputElement.setAttribute('appAutofocus', 'false');
    fixture.detectChanges();

    //expect(fixture.nativeElement.hasFocus()).toBe(false);
    expect(inputElement.autofocus).toBe(false);
  });
});
