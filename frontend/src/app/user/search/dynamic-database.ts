import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  searchPage = {
    header: 'Search Results for :',
  };
}
