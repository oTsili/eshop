import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { AddProductsService } from 'src/app/admin/add-products/add-products.service';
import { AppService } from 'src/app/app.service';

@Directive({ selector: '[checkbox]' })
export class CheckboxDirective implements OnInit {
  @Input() name: string;
  element: HTMLElement;
  mainInputSiblings: HTMLElement[];
  altInputSiblings: HTMLElement[];
  divSiblings: HTMLElement[];
  inputSiblings: HTMLElement[];
  input: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private addProductsService: AddProductsService,
    private appService: AppService
  ) {}
  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;

    this.input = this.elementRef.nativeElement.querySelector('input');

    this.mainInputSiblings =
      this.elementRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(
        '.main-radio, .main-radio > input'
      );

    this.altInputSiblings =
      this.elementRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(
        '.alt-radio, .alt-radio > input'
      );

    this.divSiblings =
      this.elementRef.nativeElement.parentElement.parentElement.querySelectorAll(
        '.checkbox'
      );

    this.inputSiblings =
      this.elementRef.nativeElement.parentElement.parentElement.querySelectorAll(
        'input'
      );
  }

  @HostListener('click', ['$event'])
  activateCheck(event) {
    event.preventDefault();
    event.stopPropagation();

    // remove the all the main or alt radio buttons,
    // respectivly to what is the current clicked button
    if (this.element.classList.contains('main-radio')) {
      this.mainInputSiblings.forEach((el) => {
        this.renderer.removeClass(el, 'checked');
        this.renderer.removeAttribute(el, 'checked');
        // save the index of main
        this.addProductsService.setMain(this.name);
      });
    } else if (this.element.classList.contains('alt-radio')) {
      this.altInputSiblings.forEach((el) => {
        this.renderer.removeClass(el, 'checked');
        this.renderer.removeAttribute(el, 'checked');
        // save the index of main
        this.addProductsService.setAlt(this.name);
      });
    }

    // remove from the current level the checked class and attribute
    this.divSiblings.forEach((el) => {
      this.renderer.removeClass(el, 'checked');
    });
    this.inputSiblings.forEach((el) => {
      this.renderer.removeAttribute(el, 'checked');
    });
    // add the class checked
    this.renderer.addClass(this.element, 'checked');
    this.renderer.setAttribute(this.input, 'checked', '');
  }
}
