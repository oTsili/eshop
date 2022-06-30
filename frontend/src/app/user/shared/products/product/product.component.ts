import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() product: Product;
  @Input() source: string;
}
