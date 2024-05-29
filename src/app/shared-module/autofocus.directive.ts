import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  @Input()
  public appAutofocus: boolean = true;

  constructor(private element: ElementRef<HTMLInputElement>) { }

  ngAfterViewInit(): void {
    if (this.appAutofocus) {
      this.element.nativeElement.setAttribute('autofocus', 'true');
    }
  }
}
