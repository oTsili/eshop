import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[simulateUnclick]',
})
export class SimulateUnclickDirective implements OnInit {
  @HostListener('mouseleave', ['$event'])
  simulateClickOutside($event: MouseEvent): void {
    const el = this.elementRef.nativeElement.parentNode.parentNode;
    console.log(el);
    // this.elementRef.nativeElement.parentNode.click();
    setTimeout(() => {
      console.log('unclick');
      this.elementRef.nativeElement.click();
    }, 500);
    $event.stopPropagation();
    $event.preventDefault();
  }

  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {}
}
