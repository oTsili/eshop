import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideCardsComponent } from './slide-cards/slide-cards.component';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { NgbdCarouselPauseModule } from 'src/app/modules/carousel-pause.module';
import { DragScrollModule } from 'ngx-drag-scroll';

import { ConceptSentenceComponent } from 'src/app/shared/concept-sentence/concept-sentence.component';
import { ClickDragCarouselComponent } from './click-drag-carousel/click-drag-carousel.component';
import { CustomCarouselComponent } from './custom-carousel/custom-carousel.component';

@NgModule({
  declarations: [
    SlideCardsComponent,
    ConceptSentenceComponent,
    ClickDragCarouselComponent,
    CustomCarouselComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgbdCarouselPauseModule,
    DragScrollModule,
  ],
  exports: [
    AngularMaterialModule,
    NgbdCarouselPauseModule,
    DragScrollModule,
    ConceptSentenceComponent,
    SlideCardsComponent,
    ClickDragCarouselComponent,
    CustomCarouselComponent,
  ],
})
export class SharedModule {}
