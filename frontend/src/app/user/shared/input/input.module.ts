import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { InputComponent } from './input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  exports: [InputComponent],
})
export class InputModule {}
