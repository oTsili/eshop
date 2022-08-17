import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropComponent } from './drag-and-drop.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { ImageContainerHostDirective } from './directives/image-container-host.directive';
import { ImageTemplateItemDirective } from './directives/image-template-directives/image-template-item.directive';
import { ImageTemplateContentDirective } from './directives/image-template-directives/image-template-content.directive';
import { SingleFileModule } from './single-file/single-file.module';

@NgModule({
  declarations: [
    DragAndDropComponent,
    DragAndDropDirective,
    ImageContainerHostDirective,
    ImageTemplateItemDirective,
    ImageTemplateContentDirective,
  ],
  imports: [CommonModule, SingleFileModule],
  exports: [DragAndDropComponent],
})
export class DragAndDropModule {}
