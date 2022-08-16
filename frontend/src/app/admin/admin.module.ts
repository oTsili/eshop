import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AddProductsModule } from './add-products/add-products.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AddProductsModule,
    HomeModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: AdminComponent,
      },
    ]),
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
