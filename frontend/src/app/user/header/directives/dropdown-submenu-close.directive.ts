import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[dropdownSubmenuClose]',
})
export class DropDownSubmenuCloseDirective implements OnInit {
  element: HTMLElement;

  constructor(private elementeRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.element = this.elementeRef.nativeElement;
  }

  @HostListener('mouseout', ['$event'])
  disableDisplay() {
    this.renderer.removeClass(this.element, 'transition');
    this.renderer.addClass(this.element, 'hidden');
    // this.renderer.setStyle(this.element, 'visibility', 'hidden');
    // this.renderer.setStyle(this.element, 'display', 'none');
  }
}
