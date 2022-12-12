import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from '../auth/auth.guard';
import { AddProductsComponent } from './add-products/add-products.component';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { ShowSuppliersComponent } from './supplier/show-suppliers/show-suppliers.component';
import { SupplierComponent } from './supplier/supplier.component';
import { TradeNumbersComponent } from './trade-numbers/trade-numbers.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'add-products' },
      {
        path: 'suppliers',
        loadChildren: () =>
          import('./supplier/supplier.module').then((m) => m.SupplierModule),
      },
      {
        path: 'add-products',
        component: AddProductsComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'trade-numbers',
        component: TradeNumbersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
