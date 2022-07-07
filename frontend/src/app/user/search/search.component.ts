import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../shared/products/products.service';
import { DynamicDatabase } from './dynamic-database';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements AfterViewInit {
  searchQuery: string | null;
  color: string | null;
  size: string | null;
  heel: string | null;
  material: string | null;
  price: string | null;
  sales: string | null;
  page = this.dynamicDatabase.searchPage;
  queryParamMapSubscription: Subscription;

  constructor(
    public dynamicDatabase: DynamicDatabase,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngAfterViewInit(): void {
    const url = this.router.url;
    console.log(url);
    const newUrl = url.split('?')[1];
    // call the method to update the products
    this.productsService.onProductsUpdate(newUrl);
  }

  // ngOnInit(): void {
  // deserialize
  // Object.entries(urlTree.queryParams).forEach(([key, value], index) => {
  //   // console.log(`${index}: ${key} = ${value}`);
  //   if (index === 0) {
  //     queryString = queryString + `?${key}=${value}`;
  //   } else {
  //     queryString = queryString + `&${key}=${value}`;
  //   }
  // });
  // console.log(queryString);
  // this.router.navigate(['/search'], {
  //   queryParams: { size: '35' },
  //   queryParamsHandling: 'merge',
  // });
  // this.queryParamMapSubscription = this.route.queryParamMap.subscribe(
  //   (paramMap: ParamMap) => {
  // const t = { ...paramMap };
  // console.log(t);
  // if (paramMap.has('color')) {
  //   this.color = paramMap.get('color');
  // }
  // if (paramMap.has('size')) {
  //   this.size = paramMap.get('size');
  // }
  // if (paramMap.has('heel')) {
  //   this.heel = paramMap.get('heel');
  // }
  // if (paramMap.has('material')) {
  //   this.material = paramMap.get('material');
  // }
  // if (paramMap.has('price')) {
  //   this.price = paramMap.get('price');
  // }
  // if (paramMap.has('sales')) {
  //   this.sales = paramMap.get('sales');
  // }
  // if (paramMap.has('searchQuery')) {
  //   this.searchQuery = paramMap.get('searchQuery');
  // }
  //   }
  // );
  // }

  // ngOnDestroy(): void {
  //   this.queryParamMapSubscription.unsubscribe();
  // }
}
