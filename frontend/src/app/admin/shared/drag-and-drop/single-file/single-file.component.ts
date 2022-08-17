import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AppService } from 'src/app/app.service';
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
  size: string;

  constructor(private elementRef: ElementRef, private appService: AppService) {}

  ngOnInit(): void {
    this.imageReader.onloadend = (e) => {
      this.src = this.imageReader.result as string;
    };

    this.imageReader.readAsDataURL(this.data.file);

    this.size = this.appService.formatBytes(this.data.file.size);
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
}
