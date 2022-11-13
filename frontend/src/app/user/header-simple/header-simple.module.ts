import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderSimpleComponent } from './header-simple.component';

@NgModule({
  declarations: [HeaderSimpleComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderSimpleComponent],
})
export class HeaderSimpleModule {}
