import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header.service';

@Directive({
  selector: '[dropdownMenuOpen]',
})
export class DropdownMenuOpenDirective implements OnInit {
  menuElement: HTMLElement;
  changeHamburgerStatusSubscription: Subscription;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.changeHamburgerStatusSubscription = this.headerService
      .getHamburgerStatusListener()
      .subscribe((response) => {
        // this.isOpenHamburgerMenu = isOpenHamburgerMenu;
        if (response.isOpen) {
          this.activateDisplay(response.event);
        }
      });

    this.menuElement = this.elementRef.nativeElement.querySelector('.menu');
  }
  @HostListener('mouseover', ['$event'])
  // @HostListener('click', ['$event'])
  activateDisplay(event: MouseEvent): void {
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
