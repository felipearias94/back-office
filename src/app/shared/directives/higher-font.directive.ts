import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[higherFont]',
})
export class HigherFontDirective {
  constructor(private elementRef: ElementRef, private render: Renderer2) {
    this.render.setStyle(this.elementRef.nativeElement, 'font-size', '20px');
  }
}
