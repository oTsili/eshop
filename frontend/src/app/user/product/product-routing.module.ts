import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { EditProductComponent } from '../cart/edit-product/edit-product.component';

const productRoutes: Routes = [
  {
    path: 'edit-product',
    canLoad: [AuthGuard],
    component: EditProductComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
