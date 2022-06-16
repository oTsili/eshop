import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
=======
import { AngularMaterialModule } from './modules/angular-material.module';
// import { BootstrapModule } from './modules/bootstrap.module';
import { NgbdCarouselPauseModule } from './modules/carousel-pause.module';
import { ConceptSentenceComponent } from './shared/concept-sentence/concept-sentence.component';
import { CarSliderComponent } from './shared/car-slider/car-slider.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ConceptSentenceComponent, CarSliderComponent],
>>>>>>> 9fcd4be64e7f248ce9d05d51bde15e1efd5839af
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
