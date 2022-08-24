import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Element } from 'src/app/user/shared/accordion/accordion.interfaces';
import { imgMimeType } from 'src/app/user/shared/validators/img-mime-type-validator';
import { environment } from 'src/environments/environment';
import {
  TradeNumber,
  TradeNumbers,
} from '../../trade-numbers/trade-numbers.interfaces';
import { TradeNumbersService } from '../../trade-numbers/trade-numbers.service';
import { AddProductsService } from '../add-products.service';
import { UploadProduct } from './upload-product.interfaces';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
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
    private formBuilder: FormBuilder
  ) {}

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

      images: new FormControl(null, {}),
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

  onMaterialClick(value: string) {
    this.theProductForm.get('material')?.patchValue(value);
  }
  onHeelClick(value: string) {
    this.theProductForm.get('heel_height')?.patchValue(value);
  }

  onSizeClick(value: string) {
    this.theProductForm.get('size')?.patchValue(value);
  }
  onSeasonClick(value: string) {
    this.theProductForm.get('season')?.patchValue(value);
  }
  onStyleClick(value: string) {
    this.theProductForm.get('style')?.patchValue(value);
  }
  onTypeClick(value: string) {
    this.theProductForm.get('type')?.patchValue(value);
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);

    if (form.invalid) {
      console.log('invalid form');
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

    // console.log({ product });

    // this.productFormService.submitProductForm(product).subscribe(
    //   {
    //     next: (response) => {
    //       console.log(response);
    //     },
    //   }
    // );

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
}
