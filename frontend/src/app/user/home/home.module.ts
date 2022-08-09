import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingPageModule } from './landing-page/landing-page.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,

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
