import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { enableFormDirective } from './enable-form-control.directive';

@Directive({ selector: '[addTableRow]' })
export class AddRowDirective implements OnInit {
  element: HTMLElement;
  beforeElement: HTMLElement;
  parentElement: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private enableFormDirective: enableFormDirective
  ) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
    this.parentElement =
      this.elementRef.nativeElement.parentElement.parentElement.parentElement;
    this.beforeElement =
      this.elementRef.nativeElement.parentElement.parentElement.parentElement.querySelector(
        '.centered'
      );
  }

  @HostListener('click', ['$event'])
  addRow(event) {
    //create a tr
    const tr = this.renderer.createElement('tr');

    // create a td
    const td1 = this.renderer.createElement('td');
    // create an input element
    const input1 = this.renderer.createElement('input');
    this.renderer.addClass(input1, 'disabled');
    this.renderer.setAttribute(input1, 'formControlName', 'style_description');
    this.renderer.setAttribute(input1, 'type', 'text');
    // add the input to the td
    this.renderer.appendChild(td1, input1);

    // create a div
    const div1 = this.renderer.createElement('div');
    this.renderer.addClass(div1, 'div-text');
    // add the div to the td
    this.renderer.appendChild(td1, div1);
    // add the td to the row
    this.renderer.appendChild(tr, td1);

    // create a td
    const td2 = this.renderer.createElement('td');
    const input2 = this.renderer.createElement('input');
    this.renderer.addClass(input2, 'disabled');
    this.renderer.setAttribute(input2, 'formControlName', 'style_code');
    this.renderer.setAttribute(input2, 'type', 'text');
    // add the input to the td
    this.renderer.appendChild(td2, input2);

    // create a div
    const div2 = this.renderer.createElement('div');
    this.renderer.addClass(div2, 'div-text');
    // add the div to the td
    this.renderer.appendChild(td2, div2);
    // add the td to the row
    this.renderer.appendChild(tr, td2);

    // create a td element
    const td3 = this.renderer.createElement('td');
    // create an "a" element
    const a1 = this.renderer.createElement('a');
    this.renderer.addClass(a1, 'disabled');
    this.renderer.addClass(a1, 'checkmark-icon');
    // create an "i" element
    const i1 = this.renderer.createElement('i');
    this.renderer.addClass(i1, 'large');
    this.renderer.addClass(i1, 'green');
    this.renderer.addClass(i1, 'checkmark');
    this.renderer.addClass(i1, 'icon');

    // add the i element to the a element
    this.renderer.appendChild(a1, i1);
    // add the a element to the td
    this.renderer.appendChild(td3, a1);
    // add the td to the tr
    this.renderer.appendChild(tr, td3);

    // create a td element
    const td4 = this.renderer.createElement('td');
    // create an "a" element
    const a2 = this.renderer.createElement('a');
    // this.renderer.setAttribute(a2, 'enableForm', '');
    this.renderer.listen(a2, 'click', (event) => {
      this.enableFormDirective.enableFormFunction(event, true);
    });
    // create an "i" element
    const i2 = this.renderer.createElement('i');
    this.renderer.addClass(i2, 'ph-pencil-thin');
    // add the i element to the a element
    this.renderer.appendChild(a2, i2);
    // add the a element to the td element
    this.renderer.appendChild(td4, a2);
    // add the td to the tr
    this.renderer.appendChild(tr, td4);

    // create a td element
    const td5 = this.renderer.createElement('td');
    // create an "a" element
    const a3 = this.renderer.createElement('a');
    this.renderer.listen(a3, 'click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      console.log('implement delete functionality');
    });

    // create an "i" element
    const i3 = this.renderer.createElement('i');
    this.renderer.addClass(i3, 'ph-trash-thin');
    // add the i element to the "a" element
    this.renderer.appendChild(a3, i3);
    // add the "a" element to the "td" element
    this.renderer.appendChild(td5, a3);
    // add the td elemnt to the tr element
    this.renderer.appendChild(tr, td5);

    // add the tr
    this.renderer.insertBefore(this.parentElement, tr, this.beforeElement);
  }
}
