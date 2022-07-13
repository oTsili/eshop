import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ConceptSentenceModule } from '../shared/concept-sentence/concept-sentence.module';
import { CustomCarouselModule } from '../shared/custom-carousel/custom-carousel.module';
import { CustomDragCarouselModule } from '../shared/custom-drag-carousel/custom-drag-carousel.module';
import { RouterModule } from '@angular/router';
import { ResponsiveComponentsModule } from '../shared/responsive-components/responsive-components.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ConceptSentenceModule,
    CustomCarouselModule,
    CustomDragCarouselModule,
    ResponsiveComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeModule {}
