import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemClass } from './item/item';
import { ProductComponent } from './product/product.component';
import { HeroJobAdComponent } from './test/hero.component';
import { HeroProfileComponent } from './test/profile.component';

const BACKEND_URL = environment.BASE_URL + 'products';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private elementInitializeListener = new Subject<number>();
  private index = 0;
  private items: any[];

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
  }

  getComponents(products) {
    return [
      new ItemClass(ProductComponent, {
        name: 'Bombasto',
        bio: 'Brave as they come',
        products: products,
      }),
      new ItemClass(ProductComponent, {
        name: 'Dr IQ',
        bio: 'Smart as they come',
        products: products,
      }),
      new ItemClass(ProductComponent, {
        headline: 'Hiring for several positions',
        body: 'Submit your resume today!',
        products: products,
      }),
      new ItemClass(ProductComponent, {
        headline: 'Openings in all departments',
        body: 'Apply today',
        products: products,
      }),
    ];
  }

  getElementInitializeListener() {
    return this.elementInitializeListener.asObservable();
  }

  updateElementInitialize(productWidth: number) {
    this.elementInitializeListener.next(productWidth);
  }

  saveItems(items: any) {
    this.items = items;
  }

  getItems() {
    return this.items;
  }

  get itemIndex() {
    return this.index;
  }

  set itemIndex(idx: number) {
    if (idx === undefined) {
      console.log('index not provided');
      return;
    }
    this.index = idx;
  }
}
