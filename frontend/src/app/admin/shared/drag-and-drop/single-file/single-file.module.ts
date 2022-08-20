import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleFileComponent } from './single-file.component';
import { ProgressBarModule } from '../../progress-bar/progress-bar.module';
import { CheckboxDirective } from '../directives/checkbox.directive';



@NgModule({
  declarations: [SingleFileComponent, CheckboxDirective],
  imports: [CommonModule, ProgressBarModule],
  exports: [SingleFileComponent],
})
export class SingleFileModule {}
