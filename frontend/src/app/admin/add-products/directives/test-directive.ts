import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[test]',
})
export class testDirective implements OnInit {
  element: HTMLElement;
  @Input() form;
  @Input() controlName;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
  }

  @HostListener('click', ['$event'])
  print(event) {
    console.log(this.element);
    console.log(this.form.get(this.controlName));
  }
}
