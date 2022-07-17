import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[simulateClick]',
})
export class SimulateClickDirective implements OnInit {
  @HostListener('mouseover', ['$event'])
  simulateClickEvent($event: MouseEvent): void {
    this.elementRef.nativeElement.click();
    console.log('click');
    $event.stopPropagation();
    $event.preventDefault();

    // this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', 1050);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}
}
