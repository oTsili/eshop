import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { ShowSuppliersComponent } from './show-suppliers/show-suppliers.component';
import { SupplierComponent } from './supplier.component';

const supplierRoutes: Routes = [
  {
    path: '',
    component: SupplierComponent,
    children: [
      {
        path: '',
        redirectTo: 'show-suppliers',
      },
      {
        path: 'show-suppliers',
        component: ShowSuppliersComponent,
        // loadChildren: () =>
        //   import('./show-suppliers/show-suppliers.module').then(
        //     (m) => m.ShowSuppliersModule
        //   ),
      },
      {
        path: 'add-supplier',
        component: AddSupplierComponent,
        // loadChildren: () =>
        //   import('./add-supplier/add-supplier.module').then(
        //     (m) => m.AddSupplierModule
        //   ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(supplierRoutes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule {}
