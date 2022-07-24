import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginatorService {
  productsLoadedListener = new Subject<{
    totalProducts: number;
    productsPerPage: number;
  }>();

  getProductsLoadedListener() {
    return this.productsLoadedListener.asObservable();
  }

  onProductsLoaded(totalProducts: number, productsPerPage: number) {
    this.productsLoadedListener.next({ totalProducts, productsPerPage });
  }
}
