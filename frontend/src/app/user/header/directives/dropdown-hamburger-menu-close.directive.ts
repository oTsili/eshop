import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[hamburgerMenuClose]',
})
export class HamburgerMenuCloseDirective implements OnInit {
  parentElement: HTMLElement;
  menuElements: HTMLElement[];

  constructor(private elementeRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.parentElement = this.elementeRef.nativeElement.parentElement;
    this.menuElements =
      this.elementeRef.nativeElement.parentElement.querySelectorAll('.menu');
  }

  // @HostListener('mouseleave', ['$event'])
  @HostListener('click', ['$event'])
  //   @HostListener('mousemove', ['$event'])
  disableDisplay(event: MouseEvent) {
    this.renderer.removeClass(this.parentElement, 'active');
    this.renderer.removeClass(this.parentElement, 'visible');
    this.menuElements.forEach((el) => {
      this.renderer.removeClass(el, 'transition');
      this.renderer.removeClass(el, 'visible');
    });
  }
}
