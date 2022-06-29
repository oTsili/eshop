import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ConceptSentenceModule } from '../shared/concept-sentence/concept-sentence.module';
import { CustomCarouselModule } from '../shared/custom-carousel/custom-carousel.module';
import { CustomDragCarouselModule } from '../shared/custom-drag-carousel/custom-drag-carousel.module';
import { GridLinkImgsModule } from '../shared/grid-link-imgs/grid-link-imgs.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ConceptSentenceModule,
    CustomCarouselModule,
    CustomDragCarouselModule,
    GridLinkImgsModule,
  ],
})
export class HomeModule {}
