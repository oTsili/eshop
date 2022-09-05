import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SupplierComponent } from './supplier.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { ShowSuppliersModule } from './show-suppliers/show-suppliers.module';
import { AddSupplierModule } from './add-supplier/add-supplier.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SupplierComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    // ShowSuppliersModule,
    // AddSupplierModule,
    // RouterModule,
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     pathMatch: 'full',
    //     component: SupplierComponent,
    //   },
    // ]),
  ],
  exports: [SupplierComponent],
})
export class SupplierModule {}
