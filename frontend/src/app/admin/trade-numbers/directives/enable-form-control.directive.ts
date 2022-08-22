import {
  Directive,
  ElementRef,
  HostListener,
  Injectable,
  OnInit,
  Renderer2,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
@Directive({ selector: '[enableform]' })
export class enableFormDirective implements OnInit {
  element: HTMLElement;
  inputs: HTMLElement[];
  texts: HTMLElement[];
  checkmarkIcon: HTMLElement;
  isOpenForm = false;

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
  enableFormFunction(event, fromAddButton = false) {
    console.log('i am clicked');
    event.preventDefault();
    event.stopPropagation();

    console.log(this.eleementRef.nativeElement.parentElement.parentElement);

    if (fromAddButton) {
      this.element = this.eleementRef.nativeElement;
      this.inputs =
        this.eleementRef.nativeElement.parentElement.parentElement.parentElement.querySelectorAll(
          'input'
        );
      this.texts =
        this.eleementRef.nativeElement.parentElement.parentElement.parentElement.querySelectorAll(
          '.div-text'
        );
      this.checkmarkIcon =
        this.eleementRef.nativeElement.parentElement.parentElement.parentElement.querySelectorAll(
          '.checkmark-icon'
        )[this.texts.length / 2 - 1];
      console.log(this.checkmarkIcon);
    }

    if (!this.isOpenForm) {
      this.renderer.removeClass(this.checkmarkIcon, 'disabled');
      for (let i = this.texts.length - 2; i < this.texts.length; i++) {
        this.renderer.addClass(this.texts[i], 'disabled');
        this.renderer.removeClass(this.inputs[i], 'disabled');
      }
    } else {
      this.renderer.addClass(this.checkmarkIcon, 'disabled');
      for (let i = this.texts.length - 2; i < this.texts.length; i++) {
        this.renderer.addClass(this.inputs[i], 'disabled');
        this.renderer.removeClass(this.texts[i], 'disabled');
      }
    }

    this.isOpenForm = !this.isOpenForm;
  }
}
