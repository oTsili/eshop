import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AddProductsService } from 'src/app/admin/add-products/add-products.service';
import { ProductFormService } from 'src/app/admin/add-products/product-form/product-form.service';
import { AddSupplierService } from 'src/app/admin/supplier/add-supplier/add-supplier.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-single-file',
  templateUrl: './single-file.component.html',
  styleUrls: ['./single-file.component.scss'],
})
export class SingleFileComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: any;
  private imageReader = new FileReader();
  src: string;
  size: string;
  productFormSubscription: Subscription;
  supplierFormSubscription: Subscription;
  form: FormGroup;

  constructor(
    private elementRef: ElementRef,
    private appService: AppService,
    private addProductService: AddProductsService,
    private productFormService: ProductFormService,
    private addSupplierService: AddSupplierService
  ) {}

  ngOnInit(): void {
    this.productFormSubscription = this.productFormService
      .getProductFormListener()
      .subscribe({
        next: (response) => {
          if (response) this.form = response;
        },
      });

    this.supplierFormSubscription = this.addSupplierService
      .getSupplierFormListener()
      .subscribe({
        next: (response) => {
          if (response) this.form = response;
          // console.log(response);
        },
      });

    this.uploadFilesSimulator(0);

    this.imageReader.onloadend = (e) => {
      this.src = this.imageReader.result as string;
    };

    this.imageReader.readAsDataURL(this.data.file);

    this.size = this.appService.formatBytes(this.data.file.size);

    // add push the file to the service's array
    this.addProductService.pushFilesArray(this.data.file);

    this.addSupplierService.setFile(this.data.file);
    // console.log(this.data);
    // this.fileForm = this.formBuilder.group({
    //   fileFormArray: this.formBuilder.array([]),
    // });

    // this.fileFormArray = this.fileForm.get('fileFormArray') as FormArray;
  }

  ngOnDestroy(): void {
    this.productFormSubscription.unsubscribe();
    this.supplierFormSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile() {
    console.log(this.form);
    this.form.get('photo')?.patchValue(null);
    this.addProductService.spliceFilesArray(this.data.file);
    this.addSupplierService.deleteFile();

    this.productFormService.updateForm(this.form);
    this.addSupplierService.updateSupplierForm(this.form);
    this.elementRef.nativeElement.remove();
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    // console.log(this.data.file.progress);
    setTimeout(() => {
      const progressInterval = setInterval(() => {
        if (this.data.file.progress === 100) {
          clearInterval(progressInterval);
        } else {
          this.uploadFilesSimulator(index + 1);
          this.data.file.progress += 5;
        }
      }, 200);
    }, 1000);
  }
}
