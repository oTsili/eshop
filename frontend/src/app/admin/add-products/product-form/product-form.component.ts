import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { imgMimeType } from 'src/app/user/shared/validators/img-mime-type-validator';
import { ProductFormService } from './product-form.service';
import { UploadProduct } from './upload-product.interfaces';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  theProductForm: FormGroup;
  isLoading = false;
  sumbitDate: string;

  constructor(
    private appService: AppService,
    private productFormService: ProductFormService
  ) {}

  ngOnInit(): void {
    this.theProductForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
      colors: new FormControl(null, {
        validators: [Validators.required],
      }),
      sizes: new FormControl(null, {
        validators: [Validators.required],
      }),
      material: new FormControl(null, {
        validators: [Validators.required],
      }),
      price: new FormControl(null, {
        validators: [Validators.required],
      }),
      sales: new FormControl(null, {
        validators: [Validators.required],
      }),
      heel_height: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
      images: new FormControl(null, {
        // validators: [Validators.required],
        asyncValidators: [imgMimeType],
      }),
    });
  }

  onSubmit(form: FormGroup) {
    // if (form.invalid) {
    //   console.log('invalid form');
    //   return;
    // }

    this.sumbitDate = this.appService.getDateString();
    console.log(this.sumbitDate);

    this.isLoading = true;

    const {
      images,
      name,
      colors,
      sizes,
      material,
      price,
      sales,
      heel_heigh,
      description,
    }: UploadProduct = {
      ...form.value,
    };

    const user: UploadProduct = {
      images,
      name,
      colors,
      sizes,
      material,
      price,
      sales,
      heel_heigh,
      description,
    };

    console.log({ user });

    this.productFormService.submitProductForm(user).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
      }
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
    );

    this.isLoading = false;
  }
}
