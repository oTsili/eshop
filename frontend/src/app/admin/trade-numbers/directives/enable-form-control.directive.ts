import {
  Directive,
  ElementRef,
  HostListener,
  Injectable,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({ selector: '[enableform]' })
export class EnableFormDirective implements OnInit {
  element: HTMLElement;
  inputs: HTMLElement[];
  texts: HTMLElement[];
  checkmarkIcon: HTMLElement;
  @Input() isOpenForm = false;
  @Input() colStart: number;

  constructor(private eleementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.element = this.eleementRef.nativeElement;
    this.inputs =
      this.eleementRef.nativeElement.parentElement.parentElement.querySelectorAll(
        'input'
      );
    this.texts =
      this.eleementRef.nativeElement.parentElement.parentElement.querySelectorAll(
        '.div-text'
      );
    this.checkmarkIcon =
      this.eleementRef.nativeElement.parentElement.parentElement.querySelector(
        '.checkmark-icon'
      );
  }

  @HostListener('click', ['$event'])
  enableFormFunction(event) {
    // console.log('i am clicked');
    event.preventDefault();
    event.stopPropagation();

    if (!this.isOpenForm) {
      this.renderer.removeClass(this.checkmarkIcon, 'disabled');
      for (
        let i = this.texts.length - this.colStart;
        i < this.texts.length;
        i++
      ) {
        this.renderer.addClass(this.texts[i], 'disabled');
        this.renderer.removeClass(this.inputs[i], 'disabled');
      }
    } else {
      this.renderer.addClass(this.checkmarkIcon, 'disabled');
      for (
        let i = this.texts.length - this.colStart;
        i < this.texts.length;
        i++
      ) {
        this.renderer.addClass(this.inputs[i], 'disabled');
        this.renderer.removeClass(this.texts[i], 'disabled');
      }
    }

    this.isOpenForm = !this.isOpenForm;
  }
}
