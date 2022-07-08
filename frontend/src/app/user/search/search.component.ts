import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../shared/products/products.service';
import { ColorSelectorService } from '../shared/side-bar/color-selector/color-selector.service';
import { Chip } from '../shared/side-bar/side-bar.interfaces';
import { DynamicDatabase } from './dynamic-database';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements AfterViewInit, OnInit {
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
    private route: ActivatedRoute,
    public dynamicDatabase: DynamicDatabase,
    private router: Router,
    private productsService: ProductsService,
    private colorSelectorService: ColorSelectorService
  ) {}

  ngAfterViewInit(): void {
    const url = this.router.url;
    const query = url.split('?')[1];
    // call the method to update the products
    // on Products component
    let queryArr = this.getQueryValues();
    this.productsService.chipsListInitialize(queryArr);
    this.productsService.onProductsUpdate(query);
    let colorIndex = this.productsService.getChipIndex('color');
    let colorValue = '';
    if (colorIndex >= 0) {
      colorValue = queryArr[colorIndex].value;
      this.colorSelectorService.onUpdateActiveStatus(null, colorValue);
    }
    // this.colorSelectorService.onUpdateActiveStatus(queryIndex);
  }

  ngOnInit(): void {}
  /**
   * Gets the current url and returns an array of the query parameters values
   * @returns an array of the query parameters values
   */
  getQueryValues() {
    let urlTree = this.router.parseUrl(this.router.url);
    let queryArr: Chip[] = [];
    Object.entries(urlTree.queryParams).forEach(([key, value], index) => {
      let chipObject: Chip = {
        key: `${key}`,
        value: `${value}`,
      };
      queryArr.push(chipObject);
    });
    return queryArr;
  }

  // ngOnInit(): void {
  // let urlTree = this.router.parseUrl(this.router.url);
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
  // console.log({ ...paramMap.keys });
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
  //     }
  //   );
  // }

  // ngOnDestroy(): void {
  //   this.queryParamMapSubscription.unsubscribe();
  // }
}
