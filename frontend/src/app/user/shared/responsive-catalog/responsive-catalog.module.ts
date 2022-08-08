import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveCatalogComponent } from './responsive-catalog.component';
import { FirstElementDirective } from './directives/first-element.directive';
import { SecondElementDirective } from './directives/second-element.directive';
import { ParentElementDirective } from './directives/parent-element.directive';
import { ElementWidthDirective } from './directives/element-width.directive';

@NgModule({
  declarations: [
    ResponsiveCatalogComponent,
    FirstElementDirective,
    SecondElementDirective,
    ParentElementDirective,
    ElementWidthDirective,
  ],
  imports: [CommonModule],
  exports: [
    ResponsiveCatalogComponent,
    FirstElementDirective,
    SecondElementDirective,
    ParentElementDirective,
  ],
})
export class ResponsiveCatalogModule {}
