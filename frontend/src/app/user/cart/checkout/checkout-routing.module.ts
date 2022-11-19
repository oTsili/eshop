import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { BillingModule } from './billing/billing.module';
import { CheckoutComponent } from './checkout.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ShippingModule } from './shipping/shipping.module';

const checkoutRoutes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      { path: '', redirectTo: 'shipping' },
      {
        path: 'shipping',
        loadChildren: () => ShippingModule,
        data: {
          title: 'shipping',
          breadcrumb: [
            {
              label: 'shipping',
              url: 'shipping',
            },
          ],
        },
        // component: ShippingComponent,
      },
      {
        path: 'billing',
        loadChildren: () => BillingModule,
        data: {
          title: 'billing',
          breadcrumb: [
            {
              label: 'billing',
              url: 'billing',
            },
          ],
        },
      },
    ],
  },

  // {
  //   path: '',
  //   component: CheckoutComponent,
  //   children: [
  //     {
  //       path: 'Shipping',
  //       canLoad: [AuthGuard],
  //       component: ShippingComponent,
  //       // loadChildren: () =>
  //       data: {
  //         title: 'Shipping',
  //         breadcrumb: [
  //           {
  //             label: 'Shipping',
  //             url: 'Shipping',
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(checkoutRoutes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
