import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { AddProductsService } from '../add-products.service';
import englishLanguage from 'src/assets/i18n/toEn.json';

@Directive({ selector: '[multipleSelectOption]' })
export class MultipleSelectOptionDirective implements OnInit {
  element: HTMLElement;
  grandparentElement: HTMLElement;
  defaultTextElement: HTMLElement;
  // selectedItems: string[];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private addProductsService: AddProductsService
  ) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
    this.grandparentElement =
      this.elementRef.nativeElement.parentElement.parentElement;
    this.defaultTextElement =
      this.elementRef.nativeElement.parentElement.parentElement.querySelector(
        '.default'
      );
  }

  @HostListener('click', ['$event'])
  onSelectOption(event) {
    // remove the item from the list(so that it cannot be selected again)
    this.renderer.addClass(this.element, 'active');
    this.renderer.addClass(this.element, 'filtered');

    // create an a element with the classes
    const aElem = this.renderer.createElement('a');
    this.renderer.addClass(aElem, 'ui');
    this.renderer.addClass(aElem, 'label');
    this.renderer.addClass(aElem, 'transition');
    this.renderer.addClass(aElem, 'visible');

    // set the data-value
    // const dataValue = this.elementRef.nativeElement.getAttribute('data-value');
    const dataValue = this.elementRef.nativeElement.innerText;
    this.renderer.setAttribute(aElem, 'data-value', dataValue);

    // save the value to the list of products service
    let tranDataValue = englishLanguage[dataValue.trim().toLowerCase()];
    this.addProductsService.pushColorsArray(tranDataValue);

    const text = this.renderer.createText(dataValue);
    this.renderer.appendChild(aElem, text);

    // create the delete icon
    const iElem = this.renderer.createElement('i');
    this.renderer.addClass(iElem, 'delete');
    this.renderer.addClass(iElem, 'icon');

    // append the delete icon to the a element
    this.renderer.appendChild(aElem, iElem);
    // add a listener to the delete icon
    this.renderer.listen(iElem, 'click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      // remove the value from the selected items array on products service
      this.addProductsService.spliceColorsArray(tranDataValue);

      // remove the a element from the list of selected colors
      aElem.remove();
      //   add the color to the list of options (so that it can be selected again)
      this.renderer.removeClass(this.element, 'active');
      this.renderer.removeClass(this.element, 'filtered');

      //   if there are no more selected colors in the list display the default text
      const aElements = this.grandparentElement.querySelectorAll('a');
      if (aElements.length === 0) {
        this.renderer.setStyle(
          this.defaultTextElement,
          'display',
          'inline-block'
        );
      }
    });

    // remove the default text from the list of selected colors
    this.renderer.setStyle(this.defaultTextElement, 'display', 'none');

    // append the a element to the list of active elements
    this.renderer.appendChild(this.grandparentElement, aElem);
  }
}
