import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../shared/responsive-catalog/container/item/item';
import { Product } from './products.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isLoading = false;
  productsSubscription: Subscription;
  products: Product[];
  productComponents: Item[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductComponents();
  }

  getProducts() {
    this.isLoading = true;
    this.productsSubscription = this.productsService
      .getProducts()
      .subscribe((response) => {
        this.products = response.products;
        this.isLoading = false;
      });
  }

  getProductComponents() {
    this.isLoading = true;
    this.productComponents = this.productsService.getProductComponents();
    console.log(this.productComponents);
  }
}
