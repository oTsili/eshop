import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CartItem } from 'src/app/user/account/account.interfaces';
import { Product } from 'src/app/user/product/product.interface';
import { environment } from 'src/environments/environment';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit, OnChanges {
  @Input() cart_item: CartItem;
  product: Product;
  oldPrice: number;
  similar_products: Product[];
  base_url = environment.BASE_URL;

  constructor(private sidebarService: SideBarService) {}

  ngOnInit(): void {
    this.getSimilarProducts();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cart_item'] && changes['cart_item'].currentValue) {
      this.cart_item = changes['cart_item'].currentValue;
      this.product = this.cart_item.product;
      // console.log(this.product);

      // compute the pre-sales(old) price from the sales percentage
      this.oldPrice =
        parseInt(this.product.price) +
        parseInt(this.product.price) * (parseInt(this.product.sales) / 100);
    }
  }

  getSimilarProducts() {
    this.sidebarService.getSimilarProducts().subscribe({
      next: (response) => {
        // console.log(response);
        this.similar_products = response.products.filter(
          (product) =>
            product.nominal_number?.split('-')[1] ===
            this.product.nominal_number?.split('-')[1]
        );

        // console.log({ similar_products: this.similar_products });

        for (let i = 0; i < this.similar_products.length; i++) {
          this.similar_products[i].src = `${this.base_url.replace(
            '/api',
            ''
          )}${this.similar_products[i].src.replace('/static', '')}`;
        }
      },
    });
  }

  hasSales(sales: string) {
    return parseInt(sales) > 0;
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }
}
