import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemModule } from './container/item/item.module';
import { ResponsiveCatalogComponent } from './responsive-catalog.component';
import { ResponsiveCatalogDirective } from './responsive-catalog.directive';
import { ItemComponent } from './container/item/item.component';
import { ContainerModule } from './container/container.module';

@NgModule({
  declarations: [ResponsiveCatalogComponent, ResponsiveCatalogDirective],
  imports: [CommonModule, ContainerModule],
  exports: [ResponsiveCatalogComponent],
})
export class ResponsiveCatalogModule {}
