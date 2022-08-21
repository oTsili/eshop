import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from '../auth/auth.guard';
import { AddProductsComponent } from './add-products/add-products.component';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { TradeNumbersComponent } from './trade-numbers/trade-numbers.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'add-products',
      //   // component: AdminComponent,
      // },
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
