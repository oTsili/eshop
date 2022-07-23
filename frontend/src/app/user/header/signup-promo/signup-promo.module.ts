import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPromoComponent } from './signup-promo.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SignupPromoComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [SignupPromoComponent],
})
export class SignupPromoModule {}
