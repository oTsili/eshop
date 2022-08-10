import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, UrlSerializer } from '@angular/router';
import { ProductsService } from 'src/app/user/product/products.service';

@Component({
  selector: 'app-double-slider',
  templateUrl: './double-slider.component.html',
  styleUrls: ['./double-slider.component.scss'],
})
export class DoubleSliderComponent implements OnInit {
  @ViewChild('fromSlider', { static: true }) fromSlider: ElementRef;
  @ViewChild('toSlider', { static: true }) toSlider: ElementRef;
  isSubmitted = false;
  from = 15;
  to = 75;

  constructor(
    private router: Router,
    private urlSerializer: UrlSerializer,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.fillSlider(
      this.fromSlider.nativeElement,
      this.toSlider.nativeElement,
      '#C6C6C6',
      '#000000',
      this.toSlider.nativeElement,
      '#000000'
    );
    this.setToggleAccessible(this.toSlider.nativeElement);
  }

  priceForm = new FormGroup({
    priceControl: new FormControl('', {
      // validators: [Validators.numbe],
    }),
  });

  onSubmit() {
    // toggle the isSubmitted value
    this.isSubmitted = true;

    // deserialize
    let urlTree = this.router.parseUrl(this.router.url);

    let price = `${this.from}\u20AC	-${this.to}\u20AC	`;
    // update the color query param
    urlTree.queryParams['price'] = price;

    // call the method to update the products
    this.productsService.toUpdateProducts(urlTree.queryParams).subscribe({
      next: (response) => {
        if (this.isSubmitted) {
          // navigate to the updated url
          this.router.navigateByUrl(urlTree);

          // compose the chip view
          let chip = { key: 'price', value: price };

          // add a chip in the sidebar
          this.productsService.addChip(chip);

          // reset the isSubmitted value
          this.isSubmitted = false;
        }
      },
    });
  }

  onRegister(form: FormGroup) {
    console.log(this.priceForm);
    if (form.invalid) {
      console.log('form invalid');
      return;
    }
    console.log(form);
  }

  controlFromSlider(
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    $event: Event
  ) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#000000', toSlider);
    this.from = from;
    this.to = to;
  }

  controlToSlider(
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    $event: Event
  ) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#000000', toSlider);
    this.setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to.toString();
      this.to = to;
    } else {
      toSlider.value = from.toString();
      this.from = from;
    }
  }

  getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  fillSlider(
    from: HTMLInputElement,
    to: HTMLInputElement,
    sliderColor: string,
    rangeColor: string,
    controlSlider: HTMLInputElement,
    initianColor?: string
  ) {
    const rangeDistance = parseInt(to.max) - parseInt(to.min);
    const fromPosition = parseInt(from.value) - parseInt(to.min);
    const toPosition = parseInt(to.value) - parseInt(to.min);
    let background = '';
    if (initianColor) {
      background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${initianColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${initianColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
    } else {
      background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
    }
    controlSlider.style.background = background;
  }

  setToggleAccessible(currentTarget: HTMLInputElement) {
    if (Number(currentTarget.value) <= 0) {
      this.toSlider.nativeElement.style.zIndex = 2;
    } else {
      this.toSlider.nativeElement.style.zIndex = 0;
    }
  }
}
