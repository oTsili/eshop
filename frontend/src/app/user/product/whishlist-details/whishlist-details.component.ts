import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { WhishlistItem } from '../../account/account.interfaces';
import { Product } from '../product.interface';

@Component({
  selector: 'app-whishlist-details',
  templateUrl: './whishlist-details.component.html',
  styleUrls: ['./whishlist-details.component.css'],
})
export class WhishlistDetailsComponent implements OnInit, OnChanges {
  @Input() whishlistItem: WhishlistItem;
  oldPrice: number;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.whishlistItem.product = changes['product'].currentValue;

    // compute the pre-sales(old) price from the sales percentage
    this.oldPrice =
      parseInt(this.whishlistItem.product.price) +
      parseInt(this.whishlistItem.product.price) *
        (parseInt(this.whishlistItem.product.sales) / 100);
  }
}
