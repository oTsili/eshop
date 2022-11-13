import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const cartRoutes: Routes = [
  {
    path: 'edit-product',
    canLoad: [AuthGuard],
    component: EditProductComponent,
    // loadChildren: () =>
    //   import('./edit-product/edit-product.module').then(
    //     (m) => m.EditProductModule
    //   ),
    data: {
      title: 'edit-product',
      breadcrumb: [
        {
          label: 'edit-product',
          url: 'edit-product',
        },
      ],
    },
  },
  {
    path: 'checkout',
    canLoad: [AuthGuard],
    component: CheckoutComponent,
    data: {
      title: 'checkout',
      breadcrumb: [
        {
          label: 'checkout',
          url: 'checkout',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(cartRoutes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
