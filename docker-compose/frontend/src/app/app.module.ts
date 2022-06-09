import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
// import { BootstrapModule } from './modules/bootstrap.module';
import { NgbdCarouselPauseModule } from './modules/carousel-pause.module';
import { ConceptSentenceComponent } from './shared/concept-sentence/concept-sentence.component';
import { CarSliderComponent } from './shared/car-slider/car-slider.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ConceptSentenceComponent, CarSliderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgbdCarouselPauseModule,
    // BootstrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
