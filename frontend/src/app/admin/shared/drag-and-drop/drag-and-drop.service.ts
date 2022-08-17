import { Injectable } from '@angular/core';
import { ImageContainerItem } from './image-container-item/image-container-item.class';
import { SingleFileComponent } from './single-file/single-file.component';

@Injectable({
  providedIn: 'root',
})
export class DragAndDropService {
  constructor() {}

  getImageComponent(file) {
    return new ImageContainerItem(SingleFileComponent, { file });
  }
}
