import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CartItem } from 'src/app/user/account/account.interfaces';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit, OnChanges {
  @Input() cart: CartItem[];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.cart = changes['cart'].currentValue;
    console.log(this.cart);
  }
}
