import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';

import { TradeNumbers } from '../../trade-numbers/trade-numbers.interfaces';
import { TradeNumbersService } from '../../trade-numbers/trade-numbers.service';
import { AddProductsService } from '../add-products.service';
import { ProductFormService } from './product-form.service';
import { UploadProduct } from './upload-product.interfaces';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy, AfterViewInit {
  theProductForm: FormGroup;
  isLoading = false;
  sumbitDate: string;
  trade_numbers: TradeNumbers;
  colorsArraySubscription: Subscription;
  filesArraySubscription: Subscription;
  mainSrcSubscription: Subscription;
  altSrcSubscription: Subscription;

  constructor(
    private appService: AppService,
    private addProductsService: AddProductsService,
    private tradeNumberService: TradeNumbersService,
    private productFormService: ProductFormService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    // this.formElement = this.elementRef.nativeElement.querySelector('.form');
    // console.log(this.formElement);
  }

  ngOnInit(): void {
    this.getTradeNumbers();
    // this.colors = environment.COLOR_LIST;
    // this.heel_heights = environment.HEEL_LIST;

    this.theProductForm = new FormGroup({
      src: new FormControl(null, {
        validators: [Validators.required],
      }),
      altSrc: new FormControl(null, {
        validators: [Validators.required],
      }),
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
      colors: new FormControl(null, {
        validators: [Validators.required],
      }),
      size: new FormControl(null, {
        validators: [Validators.required],
      }),
      price: new FormControl(null, {
        validators: [Validators.required],
      }),
      material: new FormControl(null, {
        validators: [Validators.required],
      }),
      sales: new FormControl(null, {
        validators: [Validators.required],
      }),
      heel_height: new FormControl(null, {
        validators: [Validators.required],
      }),
      season: new FormControl(null, {
        validators: [Validators.required],
      }),
      style: new FormControl(null, {
        validators: [Validators.required],
      }),
      type: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),

      images: new FormControl(null, { validators: [Validators.required] }),
      // images: new FormControl(null, {
      //   // validators: [Validators.required],
      //   asyncValidators: [imgMimeType],
      // }),
      // images: this.formBuilder.array([]),
    });

    this.colorsArraySubscription = this.addProductsService
      .getColorsArrayListener()
      .subscribe({
        next: (response) => {
          this.theProductForm.get('colors')?.patchValue(response);
        },
      });

    this.filesArraySubscription = this.addProductsService
      .getFilesArrayListener()
      .subscribe({
        next: (response) => {
          if (response) this.theProductForm.get('images')?.patchValue(response);
        },
      });

    this.mainSrcSubscription = this.addProductsService
      .getMainSrcListener()
      .subscribe({
        next: (response) => {
          if (response) {
            const mainSrc = response.split('.')[0];
            this.theProductForm.get('src')?.patchValue(mainSrc);
          }
        },
      });

    this.altSrcSubscription = this.addProductsService
      .getAltSrcListener()
      .subscribe({
        next: (response) => {
          if (response) {
            const altSrc = response.split('.')[0];
            this.theProductForm.get('altSrc')?.patchValue(altSrc);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.colorsArraySubscription.unsubscribe();
  }

  getTradeNumbers() {
    this.tradeNumberService.getTradeNumbers().subscribe({
      next: (response) => {
        // console.log(response);
        this.trade_numbers = response;
      },
    });
  }

  onOptionUpdate(event) {
    console.log('updated');
    this.theProductForm = event;
  }

  closeErrorMessage() {
    const formElement = this.elementRef.nativeElement.querySelector('.form');
    this.renderer.removeClass(formElement, 'error');
  }

  onSubmit(form: FormGroup) {
    // initialize the form without the error class
    const formElement = this.elementRef.nativeElement.querySelector('.form');
    this.renderer.removeClass(formElement, 'error');

    if (form.invalid) {
      console.log('invalid form');
      this.renderer.addClass(formElement, 'error');
      return;
    }

    this.sumbitDate = this.appService.getDateString();
    console.log(this.sumbitDate);

    this.isLoading = true;

    const {
      src,
      altSrc,
      name,
      colors,
      size,
      price,
      material,
      sales,
      heel_height,
      season,
      style,
      type,
      description,
      images,
    }: UploadProduct = {
      ...form.value,
    };

    const product: UploadProduct = {
      src,
      altSrc,
      name,
      colors,
      size,
      price,
      material,
      sales,
      heel_height,
      season,
      style,
      type,
      description,
      images,
    };

    console.log({ product });

    this.productFormService.submitProductForm(product).subscribe({
      next: (response) => {
        console.log(response);
      },
    });

    // (data) => {
    //   this.router.navigate(['/']);
    //   let duration = parseInt(data.expiresIn);
    //   this.setAuthTimer(duration);
    //   const now = new Date();
    //   const expirationDate = new Date(now.getTime() + duration * 1000);
    //   this.saveToStorage(expirationDate);
    // },
    // (error) => {
    //   this.authStatusListener.next(false);
    // }

    this.isLoading = false;
  }

  checkFormErrors() {
    if (
      (this.theProductForm.get('colors')!.invalid &&
        this.theProductForm.get('colors')!.touched &&
        this.theProductForm.get('colors')?.dirty) ||
      (this.theProductForm.get('heel_height')!.invalid &&
        this.theProductForm.get('heel_height')!.touched &&
        this.theProductForm.get('heel_height')?.dirty) ||
      (this.theProductForm.get('size')!.invalid &&
        this.theProductForm.get('size')!.touched &&
        this.theProductForm.get('size')?.dirty) ||
      (this.theProductForm.get('season')!.invalid &&
        this.theProductForm.get('season')!.touched &&
        this.theProductForm.get('season')?.dirty) ||
      (this.theProductForm.get('style')!.invalid &&
        this.theProductForm.get('style')!.touched &&
        this.theProductForm.get('style')?.dirty) ||
      (this.theProductForm.get('type')!.invalid &&
        this.theProductForm.get('type')!.touched &&
        this.theProductForm.get('type')?.dirty) ||
      (this.theProductForm.get('material')!.invalid &&
        this.theProductForm.get('material')!.touched &&
        this.theProductForm.get('material')?.dirty) ||
      (this.theProductForm.get('name')!.invalid &&
        this.theProductForm.get('name')!.touched) ||
      (this.theProductForm.get('price')!.invalid &&
        this.theProductForm.get('price')!.touched) ||
      (this.theProductForm.get('sales')!.invalid &&
        this.theProductForm.get('sales')!.touched)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
