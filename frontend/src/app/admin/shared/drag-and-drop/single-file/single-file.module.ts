import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleFileComponent } from './single-file.component';
import { ProgressBarModule } from '../../progress-bar/progress-bar.module';



@NgModule({
  declarations: [SingleFileComponent],
  imports: [CommonModule, ProgressBarModule],exports:[SingleFileComponent]
})
export class SingleFileModule {}
