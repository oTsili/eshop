import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptSentenceModule } from '../../shared/concept-sentence/concept-sentence.module';
import { CustomCarouselModule } from '../../shared/custom-carousel/custom-carousel.module';
import { CustomDragCarouselModule } from '../../shared/custom-drag-carousel/custom-drag-carousel.module';
import { ResponsiveComponentsModule } from '../../shared/responsive-components/responsive-components.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    ConceptSentenceModule,
    CustomCarouselModule,
    CustomDragCarouselModule,
    ResponsiveComponentsModule,
  ],
})
export class LandingPageModule {}
