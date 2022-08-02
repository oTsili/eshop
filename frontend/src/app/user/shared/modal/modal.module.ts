import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ModalComponent],
})
export class ModalModule {}
