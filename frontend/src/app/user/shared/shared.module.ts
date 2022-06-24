import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/user/modules/angular-material.module';
import { NgbdCarouselPauseModule } from 'src/app/user/modules/carousel-pause.module';
import { DragScrollModule } from 'ngx-drag-scroll';

import { ConceptSentenceComponent } from 'src/app/user/shared/concept-sentence/concept-sentence.component';
import { ClickDragCarouselComponent } from './click-drag-carousel/click-drag-carousel.component';
import { CustomCarouselComponent } from './custom-carousel/custom-carousel.component';
// import { ActivateDirective } from './click-drag-carousel/activate.directive';
import { GridLinkImgsComponent } from './grid-link-imgs/grid-link-imgs.component';
import { InputComponent } from './input/input.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomDragCarouselComponent } from './custom-drag-carousel/custom-drag-carousel.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DragSlideComponent } from './custom-drag-carousel/drag-slide/drag-slide.component';

@NgModule({
  declarations: [
    ConceptSentenceComponent,
    ClickDragCarouselComponent,
    CustomCarouselComponent,
    // ActivateDirective,
    GridLinkImgsComponent,
    InputComponent,
    CustomDragCarouselComponent,
    SpinnerComponent,
    DragSlideComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgbdCarouselPauseModule,
    DragScrollModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    AngularMaterialModule,
    NgbdCarouselPauseModule,
    DragScrollModule,
    ConceptSentenceComponent,
    ClickDragCarouselComponent,
    CustomCarouselComponent,
    // ActivateDirective,
    GridLinkImgsComponent,
    InputComponent,
    FlexLayoutModule,
    CustomDragCarouselComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
