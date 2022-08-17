import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TextPanelComponent } from 'src/app/user/shared/accordion/panels/EXAMPLE-text-panel/text-panel.component';
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
