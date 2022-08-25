import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleFileComponent } from './single-file.component';
import { ProgressBarModule } from '../../progress-bar/progress-bar.module';
import { CheckboxDirective } from '../directives/checkbox.directive';
import { CheckBoxErrorDirective } from '../directives/checkbox-error.directive';

@NgModule({
  declarations: [
    SingleFileComponent,
    CheckboxDirective,
    CheckBoxErrorDirective,
  ],
  imports: [CommonModule, ProgressBarModule],
  exports: [SingleFileComponent],
})
export class SingleFileModule {}
