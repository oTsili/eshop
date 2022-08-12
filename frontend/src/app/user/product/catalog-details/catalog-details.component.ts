import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../product.interface';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.css'],
})
export class CatalogDetailsComponent implements OnInit, OnChanges {
  @Input() product: Product;
  oldPrice: number;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.product = changes['product'].currentValue;

    // compute the pre-sales(old) price from the sales percentage
    this.oldPrice =
      parseInt(this.product.price) +
      parseInt(this.product.price) * (parseInt(this.product.sales) / 100);
  }
}
