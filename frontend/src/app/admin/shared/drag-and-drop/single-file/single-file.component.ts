import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { DragAndDropService } from '../drag-and-drop.service';
import { SingleFileService } from './single-file.service';

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
  fileForm: FormGroup;
  fileFormArray: FormArray;
  fileControl: AbstractControl;

  constructor(
    private elementRef: ElementRef,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private singleFileService: SingleFileService
  ) {}

  ngOnInit(): void {
    this.imageReader.onloadend = (e) => {
      this.src = this.imageReader.result as string;
    };

    this.imageReader.readAsDataURL(this.data.file);

    this.size = this.appService.formatBytes(this.data.file.size);

    this.fileForm = this.formBuilder.group({
      fileFormArray: this.formBuilder.array([]),
    });

    this.fileFormArray = this.fileForm.get('fileFormArray') as FormArray;
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
    this.elementRef.nativeElement.remove();
  }

  append() {
    this.fileControl = new FormControl();

    console.log(this.data.file);

    this.fileControl.patchValue({
      name: this.data.file.name,
      file: this.data.file,
      type: this.data.file.type,
    });

    this.fileControl.updateValueAndValidity();
  }

  onSubmitFile() {
    // update the control
    this.append();

    console.log({ control: this.fileControl });
    // send the control
    this.singleFileService.uploadFiles(this.fileControl).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
