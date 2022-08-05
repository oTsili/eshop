import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, UrlTree } from '@angular/router';
import { filter, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Chip } from '../side-bar/side-bar.interfaces';
import { Product } from './product/product.interface';

const BACKEND_URL = environment.BASE_URL + 'products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productUdateListener = new Subject<{ queryParams: Params }>();
  chipsListUpdateListener = new Subject<{ chipsList: Chip[] }>();
  sideBarWidthListener = new Subject<number>();
  changePageListener = new Subject<{
    productsPerPage: number;
    currentPage: number;
  }>();
  noProductsMesageListener = new Subject<boolean>();
  chipsList: Chip[] = [];
  showNoProductsMessage = false;
  constructor(private httpClient: HttpClient) {}

  getErrorMessageListener() {
    return this.noProductsMesageListener.asObservable();
  }

  onUpdateNoProductsMessage(show: boolean) {
    this.noProductsMesageListener.next(show);
  }

  getChangePageListener() {
    return this.changePageListener.asObservable();
  }

  onChangePage(productsPerPage: number, currentPage: number) {
    this.changePageListener.next({ productsPerPage, currentPage });
  }

  getProducts(
    porductsPerPage: number,
    currentPage: number,
    params?: Params,
    sort = '',
    filter = ''
  ) {
    let queryParams = new HttpParams()
      .set('pageSize', porductsPerPage)
      .set('currentPage', currentPage)
      .set('sort', sort)
      .set('filter', filter);

    if (params) {
      Object.entries(params).forEach(([key, value], index) => {
        queryParams = queryParams.set(key, value);
      });
    }

    return this.httpClient.get<{
      message: string;
      products: Product[];
      totalProducts: number;
    }>(`${BACKEND_URL}/query`, { params: queryParams, withCredentials: true });
  }

  getSideBarWidthListener() {
    return this.sideBarWidthListener.asObservable();
  }

  updateSideBarWidth(width: number) {
    this.sideBarWidthListener.next(width);
  }

  getChipsListUpdateListener() {
    return this.chipsListUpdateListener.asObservable();
  }

  onChipsListUpdate(chipsList: Chip[]) {
    this.chipsListUpdateListener.next({ chipsList });
  }

  getProductsUpdateListener() {
    return this.productUdateListener.asObservable();
  }

  onProductsUpdate(queryParams: Params, chip?: Chip) {
    // update the chipsList
    if (chip) {
      // get the index of the chip to be replaced
      const chipIndex = this.getChipIndex(chip.key);
      // if there is already a same chip
      if (chipIndex >= 0) {
        // remove the chip
        this.removeChip(chipIndex);
      }
      // add the new(updated) chip
      this.addChip(chip);
      // inform the app for the chipList update
      this.chipsListUpdateListener.next({ chipsList: this.chipsList });
    }

    // inform the app for the products list update
    this.productUdateListener.next({
      queryParams,
    });
  }

  chipsListInitialize(chipsList: Chip[]) {
    if (chipsList) {
      for (let chip of chipsList) {
        this.chipsList.push(chip);
      }
      this.chipsListUpdateListener.next({ chipsList: this.chipsList });
    }
  }

  removeChip(chipIndex: number): void {
    if (chipIndex >= 0) {
      this.chipsList.splice(chipIndex, 1);
      this.chipsListUpdateListener.next({ chipsList: this.chipsList });
    }
  }

  addChip(chip: Chip) {
    if (chip) {
      const chipIndex = this.getChipIndex(chip.key);
      if (chipIndex >= 0) {
        this.removeChip(chipIndex);
      }
      this.chipsList.push(chip);
      this.chipsListUpdateListener.next({ chipsList: this.chipsList });
    }
  }

  // updateProductsList(query: string) {
  //   let url = '';
  //   if (query !== '') {
  //     url = `${BACKEND_URL}/query?${query}`;
  //   } else {
  //     url = `${BACKEND_URL}`;
  //   }
  //   return this.httpClient.get<any>(url, {
  //     withCredentials: true,
  //   });
  // }

  getChipIndex(chipKey: string) {
    const chipIndex = this.chipsList.findIndex((chip) => {
      return chip.key === chipKey;
    });
    return chipIndex;
  }
}
