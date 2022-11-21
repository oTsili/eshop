import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({ selector: '[menuOpenClose]' })
export class DropdownMenuOpenCloseDirective implements OnInit {
  firstMenuElement: HTMLElement;
  allMenuElements: HTMLElement[];
  element: HTMLElement;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
    this.firstMenuElement =
      this.elementRef.nativeElement.querySelector('.menu');
    this.allMenuElements =
      this.elementRef.nativeElement.querySelectorAll('.menu');
  }

  @HostListener('mouseover', ['$event'])
  enableDisplay(event: MouseEvent) {
    // console.log('menuOpen');
    this.renderer.addClass(this.element, 'active');
    this.renderer.addClass(this.element, 'visible');

    this.renderer.addClass(this.firstMenuElement, 'transition');
    this.renderer.addClass(this.firstMenuElement, 'visible');
  }

  @HostListener('mouseout', ['$event'])
  @HostListener('click', ['$event'])
  disableDisplay(event: MouseEvent) {
    this.renderer.removeClass(this.element, 'active');

    this.allMenuElements.forEach((el) => {
      this.renderer.removeClass(el, 'transition');
      this.renderer.removeClass(el, 'visible');
    });
  }
}
