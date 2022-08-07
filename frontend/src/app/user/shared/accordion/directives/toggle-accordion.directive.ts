import {
  AfterContentInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[toggleAccordion]',
})
export class ToggleAccordionDirective implements OnInit, AfterContentInit {
  @Input()
  index!: number;
  isOpen = true;
  element!: HTMLElement;
  nextElement!: HTMLElement;
  carretButtonElement!: HTMLElement;
  paragraphElement!: HTMLElement;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.element = this.elementRef.nativeElement;
    this.carretButtonElement =
      this.elementRef.nativeElement.querySelector('button');

    this.nextElement = this.elementRef.nativeElement.nextElementSibling;
    this.paragraphElement =
      this.elementRef.nativeElement.nextElementSibling.querySelector('p');
  }

  @HostListener('click', ['$event'])
  toggleDisplay(event?: MouseEvent) {
    if (!this.isOpen) {
      this.renderer.addClass(this.element, 'active');
      this.renderer.addClass(this.nextElement, 'active');
      this.renderer.addClass(this.paragraphElement, 'visible');
      this.renderer.addClass(this.carretButtonElement, 'active');
      this.renderer.removeClass(this.paragraphElement, 'hidden');
    } else {
      this.renderer.removeClass(this.element, 'active');
      this.renderer.removeClass(this.carretButtonElement, 'active');
      this.renderer.removeClass(this.nextElement, 'active');
      this.renderer.removeClass(this.paragraphElement, 'visible');
      this.renderer.addClass(this.paragraphElement, 'hidden');
    }

    this.isOpen = !this.isOpen;
  }
}
