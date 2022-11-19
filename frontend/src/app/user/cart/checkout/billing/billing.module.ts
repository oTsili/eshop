import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BillingComponent } from './billing.component';

@NgModule({
  declarations: [BillingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: BillingComponent,
      },
    ]),
  ],
  exports: [],
})
export class BillingModule {}
