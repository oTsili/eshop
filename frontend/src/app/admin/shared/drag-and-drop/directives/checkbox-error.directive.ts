import {
  Directive,
  ElementRef,
  HostBinding,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[checkbox-error]',
})
export class CheckBoxErrorDirective implements OnInit {
  element: HTMLElement;
  inputs: HTMLElement[];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;

    this.inputs =
      this.elementRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(
        'input'
      );

    console.log(this.inputs);
  }

  @HostBinding('class.error')
  get checkError() {
    const value = this.inputs.find((input) =>
      input.classList.contains('checked')
    );
    return !!value;
  }
}
