import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { HeaderService } from '../header.service';

@Directive({
  selector: '[IconMenuOpen]',
})
export class IconMenuOpenDirective implements OnInit {
  menuElement: HTMLElement;
  parentElement: HTMLElement;
  menuElements: HTMLElement[];
  isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // console.log({ isOpen: this.isOpen });
    this.menuElement = this.elementRef.nativeElement.querySelector('.menu');
    this.parentElement = this.elementRef.nativeElement.parentElement;
    this.menuElements =
      this.elementRef.nativeElement.parentElement.querySelectorAll('.menu');
  }
  // @HostListener('mouseover', ['$event'])
  @HostListener('click', ['$event'])
  activateDisplay(event: MouseEvent): void {
    // console.log({ isOpen: this.isOpen });
    if (!this.isOpen) {
      // console.log('iconOpen');
      this.renderer.addClass(this.elementRef.nativeElement, 'active');
      this.renderer.addClass(this.elementRef.nativeElement, 'visible');
      this.renderer.addClass(this.menuElement, 'transition');
      this.renderer.addClass(this.menuElement, 'visible');
    } else {
      // console.log('iconClose');
      this.renderer.removeClass(this.parentElement, 'active');
      this.renderer.removeClass(this.parentElement, 'visible');
      this.menuElements.forEach((el) => {
        this.renderer.removeClass(el, 'transition');
        this.renderer.removeClass(el, 'visible');
      });
    }
    this.isOpen = !this.isOpen;
  }
}
