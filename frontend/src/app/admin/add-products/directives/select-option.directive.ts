import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({ selector: '[selectOption]' })
export class SelectOptionDirective implements OnInit {
  element: HTMLElement;
  allItems: HTMLElement[];
  textElement: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;

    this.allItems =
      this.elementRef.nativeElement.parentElement.querySelectorAll('.item');

    this.textElement =
      this.elementRef.nativeElement.parentElement.parentElement.querySelector(
        '.text'
      );
  }
  @HostListener('click', ['$event'])
  displaySelected(event) {
    // remove from all the elements of the current level the classes
    if (this.allItems) {
      this.allItems.forEach((el) => {
        this.renderer.removeClass(el, 'active');
        this.renderer.removeClass(el, 'selected');
      });
    }

    // add to the current element the classes
    this.renderer.addClass(this.element, 'active');
    this.renderer.addClass(this.element, 'selected');

    // update the value of the default text
    const currentValue = this.element.innerText;
    if (currentValue) {
      this.renderer.setProperty(this.textElement, 'innerText', currentValue);
      this.renderer.setStyle(this.textElement, 'font-weight', 600);
      this.renderer.setStyle(this.textElement, 'color', 'black');
    }
  }
}
