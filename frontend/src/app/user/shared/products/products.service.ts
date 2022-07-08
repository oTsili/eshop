import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chip } from '../side-bar/side-bar.interfaces';

const BACKEND_URL = environment.BASE_URL + 'products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productUdateListener = new Subject<{ query: string }>();
  chipsListUpdateListener = new Subject<{ chipsList: Chip[] }>();
  chipsList: Chip[] = [];

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
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

  onProductsUpdate(query: string, chip?: Chip) {
    // update the chipsList
    if (chip) {
      const chipIndex = this.getChipIndex(chip.key);
      if (chipIndex >= 0) {
        this.removeChip(chip.key);
      }
      this.addChip(chip);
      // inform the app for the chipList update
      this.chipsListUpdateListener.next({ chipsList: this.chipsList });
    }
    // inform the app for the products list update
    this.productUdateListener.next({
      query,
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

  removeChip(chipKey: string): void {
    const chipIndex = this.getChipIndex(chipKey);

    // const index = this.chipsList.indexOf(chip);
    if (chipIndex >= 0) {
      this.chipsList.splice(chipIndex, 1);
      this.chipsListUpdateListener.next({ chipsList: this.chipsList });
    }
  }

  addChip(chip: Chip) {
    if (chip) {
      const chipIndex = this.getChipIndex(chip.key);
      if (chipIndex >= 0) {
        this.removeChip(chip.key);
      }
      this.chipsList.push(chip);
      this.chipsListUpdateListener.next({ chipsList: this.chipsList });
    }
  }

  updateProductsList(query: string) {
    let url = '';
    if (query !== '') {
      url = `${BACKEND_URL}/query?${query}`;
    } else {
      url = `${BACKEND_URL}`;
    }
    return this.http.get<any>(url, {
      withCredentials: true,
    });
  }

  getChipIndex(chipKey: string) {
    const chipIndex = this.chipsList.findIndex((chip) => {
      return chip.key === chipKey;
    });
    return chipIndex;
  }
}
