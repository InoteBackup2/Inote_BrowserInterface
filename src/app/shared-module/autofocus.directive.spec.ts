import { Component, ElementRef } from '@angular/core';
import { AutofocusDirective } from './autofocus.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: '<input appAutofocus>'
}) class PositiveMockComponent {}

@Component({
  template: '<input>'
}) class NegativeMockComponent {}

let positiveFixture: ComponentFixture<PositiveMockComponent>;
let negativeFixture: ComponentFixture<NegativeMockComponent>;
let inputElements: HTMLInputElement[];

describe('AutofocusDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AutofocusDirective,
        PositiveMockComponent,
        NegativeMockComponent
      ]
    }).compileComponents();

    positiveFixture = TestBed.createComponent(PositiveMockComponent);
    positiveFixture.detectChanges();
    negativeFixture = TestBed.createComponent(NegativeMockComponent);
    negativeFixture.detectChanges();

    inputElements = [
      positiveFixture.debugElement.query(By.css('input')).nativeElement,
      negativeFixture.debugElement.query(By.css('input')).nativeElement
    ]

  });

  it('should create an instance', () => {
    const inputRef = new ElementRef(inputElements[0]);
    const directive = new AutofocusDirective(inputRef);

    expect(directive).toBeTruthy();
  });

  it('creates a focused input when autofocus is present', () => {
    const focusedElement = positiveFixture
        .debugElement
        .query(By.css(':focus'));
    
    
    expect(inputElements[0].attributes.getNamedItem('appAutofocus'))
        .not
        .toBeNull();
    expect(focusedElement)
        .not
        .toBeNull();
    if (focusedElement !== null) {
      expect(focusedElement.nativeElement)
          .toBeInstanceOf(HTMLInputElement);
    }
  });

  it('does\'t create a focused input when autofocus isn\'t present', () => {
    const focusedElement = negativeFixture
        .debugElement
        .query(By.css('input:focus'));
    
    
    expect(inputElements[1].attributes.getNamedItem('appAutofocus'))
        .toBeNull();
    expect(focusedElement).toBeNull();
  });

});
