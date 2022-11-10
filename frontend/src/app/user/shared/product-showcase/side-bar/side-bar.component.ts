import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Product } from 'src/app/user/product/product.interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit, OnChanges {
  @Input() product: Product;
  oldPrice: number;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.product = changes['product'].currentValue;
    console.log(this.product);

    // compute the pre-sales(old) price from the sales percentage
    this.oldPrice =
      parseInt(this.product.price) +
      parseInt(this.product.price) * (parseInt(this.product.sales) / 100);
  }

  hasSales(sales: string) {
    return parseInt(sales) > 0;
  }
}
