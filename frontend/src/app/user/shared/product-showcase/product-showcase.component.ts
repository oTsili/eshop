import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CartItem } from '../../account/account.interfaces';
import { Product } from '../../product/product.interface';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css'],
})
export class ProductShowcaseComponent implements OnInit, OnChanges {
  @Input() cart_item: CartItem;
  product: Product;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cart_item'].currentValue) {
      this.cart_item = changes['cart_item'].currentValue;
      console.log(this.cart_item);
      this.product = this.cart_item.product;
      console.log(this.product);
    }
  }
}
