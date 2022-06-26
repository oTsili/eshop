import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[clickAccordionHeader]',
})
export class ClickAccordionHeader {
  @HostListener('click', ['$event'])
  simulateToggleBtnClickEvent(): void {
    // this.elementRef.nativeElement.children[0].children[1].focus();
    this.elementRef.nativeElement.querySelector('button').focus();
  }
  constructor(private elementRef: ElementRef) {}
}
