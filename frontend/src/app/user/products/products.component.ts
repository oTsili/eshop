import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
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
}
