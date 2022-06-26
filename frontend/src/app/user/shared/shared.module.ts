import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from 'src/app/user/modules/angular-material.module';
import { NgbdCarouselPauseModule } from 'src/app/user/modules/carousel-pause.module';
import { DragScrollModule } from 'ngx-drag-scroll';

// import { ClickDragCarouselComponent } from './NOT-USED-click-drag-carousel/click-drag-carousel.component';
// import { ActivateDirective } from './NOT-USED-click-drag-carousel/activate.directive';
import { ConceptSentenceComponent } from 'src/app/user/shared/concept-sentence/concept-sentence.component';
import { CustomCarouselComponent } from './custom-carousel/custom-carousel.component';
import { GridLinkImgsComponent } from './grid-link-imgs/grid-link-imgs.component';
import { InputComponent } from './input/input.component';
import { CustomDragCarouselComponent } from './custom-drag-carousel/custom-drag-carousel.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DragSlideComponent } from './custom-drag-carousel/drag-slide/drag-slide.component';
import { AccordionModule } from './accordion/accordion.module';

@NgModule({
  declarations: [
    // ActivateDirective,
    // ClickDragCarouselComponent,
    ConceptSentenceComponent,
    CustomCarouselComponent,
    GridLinkImgsComponent,
    InputComponent,
    CustomDragCarouselComponent,
    SpinnerComponent,
    DragSlideComponent,
  ],
  imports: [
    // NgbdCarouselPauseModule,
    CommonModule,
    AngularMaterialModule,
    DragScrollModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    // NgbdCarouselPauseModule,
    // ClickDragCarouselComponent,
    // ActivateDirective,
    AngularMaterialModule,
    DragScrollModule,
    AccordionModule,
    ConceptSentenceComponent,
    CustomCarouselComponent,
    GridLinkImgsComponent,
    InputComponent,
    FlexLayoutModule,
    CustomDragCarouselComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
