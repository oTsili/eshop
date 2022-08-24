import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { AddProductsService } from 'src/app/admin/add-products/add-products.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-single-file',
  templateUrl: './single-file.component.html',
  styleUrls: ['./single-file.component.scss'],
})
export class SingleFileComponent implements OnInit, OnChanges {
  @Input() data: any;
  private imageReader = new FileReader();
  src: string;
  size: string;
  // fileForm: FormGroup;
  // fileFormArray: FormArray;
  // fileControl: AbstractControl;

  constructor(
    private elementRef: ElementRef,
    private appService: AppService,
    private addProductService: AddProductsService // private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.uploadFilesSimulator(0);

    this.imageReader.onloadend = (e) => {
      this.src = this.imageReader.result as string;
    };

    this.imageReader.readAsDataURL(this.data.file);

    this.size = this.appService.formatBytes(this.data.file.size);

    // add push the file to the service's array
    this.addProductService.pushFilesArray(this.data.file);

    console.log(this.data);
    // this.fileForm = this.formBuilder.group({
    //   fileFormArray: this.formBuilder.array([]),
    // });

    // this.fileFormArray = this.fileForm.get('fileFormArray') as FormArray;
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
    this.addProductService.spliceFilesArray(this.data.file);
    this.elementRef.nativeElement.remove();
  }

  // onSubmitFile() {
  //   // update the control
  //   this.append();

  //   console.log({ control: this.fileControl });
  //   // send the control
  //   this.singleFileService.uploadFiles(this.fileControl).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //     },
  //   });
  // }

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
