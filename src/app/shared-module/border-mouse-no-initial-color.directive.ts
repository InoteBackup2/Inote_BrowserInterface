import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderMouseNoInitialColorDirective]'
})
export class BorderMouseNoInitialColorDirective {

  private initialColor: string = '#ffffff';
  private defaultColor: string = '#009688';

  constructor(private el: ElementRef) {
    this.setBorder(this.initialColor)
  }

  @Input('appBorderMouseNoInitialColorDirective') borderColor!: string;
  @HostListener('mouseenter') onMouseEnter() {
    console.log(this.borderColor);
    if (this.borderColor) {
      this.setBorder(this.borderColor);
    } else {
      this.setBorder(this.defaultColor);
    }
    // this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  private setBorder(color: string) {
    const BORDER = 'solid 4px' + color;
    this.el.nativeElement.style.border = BORDER;
  }
}
