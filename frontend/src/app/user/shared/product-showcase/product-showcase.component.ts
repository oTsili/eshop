import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../../product/product.interface';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css'],
})
export class ProductShowcaseComponent implements OnInit, OnChanges {
  @Input() product: Product;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.product = changes['product'].currentValue;
    console.log(this.product);
  }
}
