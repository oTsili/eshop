import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';

@Component({
  selector: 'app-single-file',
  templateUrl: './single-file.component.html',
  styleUrls: ['./single-file.component.scss'],
})
export class SingleFileComponent implements OnInit, OnChanges {
  @Input() data: any;
  private imageReader = new FileReader();
  src: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log(this.data);
    this.imageReader.onloadend = (e) => {
      this.src = this.imageReader.result as string;
      console.log(this.src);
    };

    this.imageReader.readAsDataURL(this.data.file);
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

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
