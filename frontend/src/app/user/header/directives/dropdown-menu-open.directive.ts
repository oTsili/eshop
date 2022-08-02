import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[dropdownMenuOpen]',
})
export class DropdownMenuOpenDirective implements OnInit {
  menuElement: HTMLElement;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.menuElement = this.elementRef.nativeElement.querySelector('.menu');
  }
  @HostListener('mouseover', ['$event'])
  @HostListener('click', ['$event'])
  activateDisplay(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'active');
    this.renderer.addClass(this.elementRef.nativeElement, 'visible');
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'visibility',
    //   'visible'
    // );
    // this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');

    this.renderer.addClass(this.menuElement, 'transition');
    this.renderer.addClass(this.menuElement, 'visible');
    // this.renderer.setStyle(this.menuElement, 'visibility', 'visible');
    // this.renderer.setStyle(this.menuElement, 'display', 'block');
  }
}
