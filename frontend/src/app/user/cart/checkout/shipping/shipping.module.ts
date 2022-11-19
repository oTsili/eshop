import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingComponent } from './shipping.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShippingComponent],
  imports: [
    CommonModule,
    // RouterModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ShippingComponent,
      },
    ]),
  ],
})
export class ShippingModule {}
