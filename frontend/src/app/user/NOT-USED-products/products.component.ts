import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemClass } from '../shared/NOT-USED-responsive-catalog/container/item/item';
import { Product } from './products.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  isLoading = false;
  productsSubscription: Subscription;
  products: Product[];
  productComponents: ItemClass[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  getProducts() {
    this.isLoading = true;
    this.productsSubscription = this.productsService
      .getProducts()
      .subscribe((response) => {
        this.products = response.products;
        this.isLoading = false;
        this.getProductComponents(this.products);
      });
  }

  getProductComponents(products: Product[]) {
    // this.isLoading = true;
    this.productComponents =
      this.productsService.getProductComponents(products);
  }
}
