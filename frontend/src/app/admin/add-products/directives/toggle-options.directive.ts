import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({ selector: '[openOptions]' })
export class ToggleOptionsDirective implements OnInit {
  isOpen = false;
  element: HTMLElement;
  menuElement: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
    this.menuElement = this.elementRef.nativeElement.querySelector('.menu');
  }

  @HostListener('click', ['$event'])
  toggleOptions(event) {
    console.log(this.isOpen);
    if (!this.isOpen) {
      this.renderer.addClass(this.element, 'active');
      this.renderer.addClass(this.element, 'visible');

      this.renderer.removeClass(this.menuElement, 'hidden');
      this.renderer.addClass(this.menuElement, 'visible');
    } else {
      this.renderer.removeClass(this.element, 'active');
      this.renderer.removeClass(this.element, 'visible');

      this.renderer.removeClass(this.menuElement, 'visible');
      this.renderer.addClass(this.menuElement, 'hidden');
    }

    this.isOpen = !this.isOpen;
  }
}
