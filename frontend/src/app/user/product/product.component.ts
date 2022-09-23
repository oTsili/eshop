import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnChanges {
  @Input() product: Product;
  @Input() source: string;
  @Input() img_height: string;
  @Input() img_width: string;
  @Input() img_container_width = '25rem';
  @Input() whishlist = false;
  @Input() isMouseDown = false;
  oldPrice: number;
  base_url = environment.BASE_URL;

  constructor() {}

  ngOnInit(): void {
    this.source = `${this.base_url.replace('/api', '')}${this.source.replace(
      '/static',
      ''
    )}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isMouseDown) {
      this.isMouseDown = changes['isMouseDown'].currentValue;
    }
  }

  hasSales(sales: string) {
    return parseInt(sales) > 0;
  }
}
