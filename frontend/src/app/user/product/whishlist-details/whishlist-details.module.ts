import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WhishlistDetailsComponent } from './whishlist-details.component';

@NgModule({
  declarations: [WhishlistDetailsComponent],
  imports: [CommonModule, FormsModule],
  exports: [WhishlistDetailsComponent],
})
export class WhishlistDetailsModule {}
