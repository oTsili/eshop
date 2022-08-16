import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropComponent } from './drag-and-drop.component';

@NgModule({
  declarations: [DragAndDropComponent],
  imports: [CommonModule],
  exports: [DragAndDropComponent],
})
export class DragAndDropModule {}
