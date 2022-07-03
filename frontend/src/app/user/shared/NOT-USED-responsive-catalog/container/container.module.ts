import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerDirective } from './container.directive';

@NgModule({
  declarations: [ContainerComponent, ContainerDirective],
  imports: [CommonModule],
  exports: [ContainerComponent],
})
export class ContainerModule {}
