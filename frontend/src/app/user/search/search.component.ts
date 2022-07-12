import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../shared/products/products.service';
import { ResponsiveBoxesService } from '../shared/side-bar/responsive-boxes/responsive-boxes.service';
import { ContentListService } from '../shared/side-bar/content-list/content-list.service';
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
  queryArr;

  constructor(
    private route: ActivatedRoute,
    public dynamicDatabase: DynamicDatabase,
    private router: Router,
    private productsService: ProductsService,
    private responsiveBoxesService: ResponsiveBoxesService,
    private contentListService: ContentListService
  ) {}

  ngAfterViewInit(): void {
    const url = this.router.url;
    let query = url.split('?')[1];

    // fill the chips array with the chips gained from the url
    this.queryArr = this.getChipValuesFromUrlQueries();
    console.log(this.queryArr);
    this.productsService.chipsListInitialize(this.queryArr);

    // update ActiveStatus arrays of all the filters so that the
    // selected item to be focused
    this.updateColorActiveStatus();
    this.updateSizeActiveStatus();
    this.updateHeelHeightActiveStatus();
    this.updateMaterialActiveStatus();
    this.updateSalesActiveStatus();

    console.log(query);
    // update the products on Products component
    this.productsService.onProductsUpdate(query);
  }

  updateColorActiveStatus() {
    const colorIndex = this.productsService.getChipIndex('color');
    let colorValue = '';
    if (colorIndex >= 0) {
      colorValue = this.queryArr[colorIndex].value;
      this.responsiveBoxesService.onUpdateColorActiveStatus(null, colorValue);
    }
  }

  updateSizeActiveStatus() {
    const sizeIndex = this.productsService.getChipIndex('size');
    let sizeValue = '';
    if (sizeIndex >= 0) {
      sizeValue = this.queryArr[sizeIndex].value;
      this.responsiveBoxesService.onUpdateSizeActiveStatus(null, sizeValue);
    }
  }

  updateHeelHeightActiveStatus() {
    const heelHeightIndex = this.productsService.getChipIndex('heel_height');
    let heelHeightValue = '';
    if (heelHeightIndex >= 0) {
      heelHeightValue = this.queryArr[heelHeightIndex].value;
      this.contentListService.onUpdateHeelHeighActiveStatusArray(
        null,
        heelHeightValue
      );
    }
  }

  updateSalesActiveStatus() {
    const salesIndex = this.productsService.getChipIndex('sales');
    let saleslValue = '';
    if (salesIndex >= 0) {
      saleslValue = this.queryArr[salesIndex].value;
      this.contentListService.onUpdateMaterialActiveStatusArray(
        null,
        saleslValue
      );
    }
  }

  updateMaterialActiveStatus() {
    const materialIndex = this.productsService.getChipIndex('material');
    let materialValue = '';
    if (materialIndex >= 0) {
      materialValue = this.queryArr[materialIndex].value;
      this.contentListService.onUpdateMaterialActiveStatusArray(
        null,
        materialValue
      );
    }
  }

  ngOnInit(): void {}
  /**
   * Gets the current url and returns an array of the query parameters values
   * @returns an array of the query parameters values
   */
  getChipValuesFromUrlQueries() {
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
