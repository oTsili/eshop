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
  menuElement: HTMLElement;
  parentElement: HTMLElement;

  constructor(private elementeRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.element = this.elementeRef.nativeElement;
    this.menuElement = this.elementeRef.nativeElement.querySelector('.menu');
    this.parentElement =
      this.elementeRef.nativeElement.parentElement.parentElement.querySelector(
        '.item'
      );
  }

  @HostListener('mouseout', ['$event'])
  disableDisplay() {
    console.log('submenuClose');
    // close menu when mouseout of the list of items
    this.renderer.removeClass(this.element, 'transition');
    this.renderer.addClass(this.element, 'hidden');
    // close menu when mouseout of the initial text of the list
    if (this.menuElement) {
      this.renderer.removeClass(this.menuElement, 'transition');
      this.renderer.addClass(this.menuElement, 'hidden');
    }

    if (this.parentElement) {
      this.renderer.removeClass(this.parentElement, 'active');
    }
    // this.renderer.setStyle(this.element, 'visibility', 'hidden');
    // this.renderer.setStyle(this.element, 'display', 'none');
  }
}
