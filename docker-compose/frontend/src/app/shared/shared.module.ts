import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideCardsComponent } from './slide-cards/slide-cards.component';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { NgbdCarouselPauseModule } from 'src/app/modules/carousel-pause.module';
import { ConceptSentenceComponent } from 'src/app/shared/concept-sentence/concept-sentence.component';
import { ClickDragCarouselComponent } from './click-drag-carousel/click-drag-carousel.component';


@NgModule({
  declarations: [
    SlideCardsComponent,
    ConceptSentenceComponent,
    ClickDragCarouselComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgbdCarouselPauseModule,
    
  ], 
  exports: [
    AngularMaterialModule,
    NgbdCarouselPauseModule,
    ConceptSentenceComponent,
    SlideCardsComponent
  ]
})
export class SharedModule { }
