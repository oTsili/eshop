import {
  Directive,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Directive({ selector: '[elementWidth]' })
export class ElementWidthDirective implements OnInit {
  @Output() getElementWidth = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const elementWidth = this.elementRef.nativeElement.offsetWidth;
    this.getElementWidth.emit(elementWidth);
  }
}
