import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptSentenceComponent } from './concept-sentence.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ConceptSentenceComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ConceptSentenceComponent],
})
export class ConceptSentenceModule {}
