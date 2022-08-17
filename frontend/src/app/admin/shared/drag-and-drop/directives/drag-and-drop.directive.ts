import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({ selector: '[dragAndDrop]' })
export class DragAndDropDirective {
  @HostBinding('class.fileover') fileover: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event'])
  ondDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileover = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])
  onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileover = false;
  }

  // Drop listener
  @HostListener('drop', ['$event'])
  onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileover = false;

    let files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
