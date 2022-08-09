import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveBoxesService } from '../shared/side-bar/responsive-boxes/responsive-boxes.service';
import { ContentListService } from '../shared/side-bar/content-list/content-list.service';
import { Chip } from '../shared/side-bar/side-bar.interfaces';
import { DynamicDatabase } from './dynamic-database';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { SearchService } from './search.service';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
import { PaginatorService } from '../shared/paginator/paginator.service';
import { Product } from '../product/product.interface';
import { ProductsService } from '../product/products.service';
import { Breadcrumb } from '../shared/breadcrumb/breadcrumb.interfaces';
import { BreadcrumbService } from '../shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit, OnInit, OnDestroy {
  searchQuery: string | null;
  color: string | null;
  size: string | null;
  heel: string | null;
  material: string | null;
  price: string | null;
  sales: string | null;
  page = this.dynamicDatabase.searchPage;
  changeLanguageSubscription: Subscription;
  queryHeaderSubscription: Subscription;
  productsSubscription: Subscription;
  changePagePaginatorSubscription: Subscription;
  updateProductsSubscription: Subscription;
  isOpenErrorMessageSubscription: Subscription;
  queryArr;
  pageSizeOptions = environment.PAGE_SIZE_OPTIONS;
  currentPage = environment.CURRENT_PAGE;
  totalProducts = environment.TOTAL_PRODUCTS;
  productsPerPage = environment.PRODUCTS_PER_PAGE;
  products: Product[];
  isOpenErrorMessage = false;
  productsContainerWidth: number;
  isLoading = false;
  breadcrumbItems: Breadcrumb[];

  constructor(
    public dynamicDatabase: DynamicDatabase,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private responsiveBoxesService: ResponsiveBoxesService,
    private contentListService: ContentListService,
    private translate: TranslateService,
    private searchService: SearchService,
    private appService: AppService,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private paginatorService: PaginatorService,
    private breadcrumbService: BreadcrumbService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    console.log(this.router.url);
    let routes = this.router.url.split('/');
    routes.shift();
    console.log(routes);

    this.breadcrumbItems = this.breadcrumbService.getBreadcrumbs(
      routes,
      this.router.url
    );

    this.productsContainerWidth =
      this.elementRef.nativeElement.querySelector('.elements').offsetWidth;

    this.isOpenErrorMessageSubscription = this.searchService
      .getIsOpenErrorMessageListener()
      .subscribe((response) => {
        this.isOpenErrorMessage = response;
      });

    // get query header listener
    this.queryHeaderSubscription = this.searchService
      .getSearchQueryHeaderListener()
      .subscribe((response) => {
        this.searchQuery = response;
        this.changeDetectorRef.detectChanges();
      });

    // get translate language and subscribe
    this.changeLanguageSubscription = this.appService
      .getLanguageChangeListener()
      .subscribe((response) => {
        this.translate.use(response);
      });

    // get the paginator change page listener
    this.changePagePaginatorSubscription = this.productsService
      .getChangePageListener()
      .subscribe((response) => {
        const { productsPerPage, currentPage } = response;

        this.productsPerPage = productsPerPage;
        this.currentPage = currentPage;

        let queryParams = this.router.parseUrl(this.router.url).queryParams;
        this.productsService.onProductsUpdate(queryParams);
      });

    // get the products on page initialization
    let queryParams = this.router.parseUrl(this.router.url).queryParams;
    this.getProducts(queryParams);

    // subsribe to events that update the products in the page
    this.updateProductsSubscription = this.productsService
      .getProductsUpdateListener()
      .subscribe((response) => {
        console.log('products update');
        this.getProducts(response.queryParams);
      });
  }

  ngOnDestroy(): void {
    this.changeLanguageSubscription.unsubscribe();
    this.queryHeaderSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.changePagePaginatorSubscription.unsubscribe();
    this.updateProductsSubscription.unsubscribe();
  }

  /**
   * gets the products from the db and updates the paginator
   * @param query: query parameters to the http request
   */
  getProducts(query?: Params) {
    this.isLoading = true;
    this.productsSubscription = this.productsService
      .getProducts(this.productsPerPage, this.currentPage, query)
      .subscribe((response) => {
        const { totalProducts, products, message } = response;
        this.products = products;

        this.totalProducts = totalProducts;

        // console.log({ totalProducts: this.totalProducts });

        this.paginatorService.onProductsLoaded(
          totalProducts,
          this.productsPerPage
        );

        // show the no results message in case of no products
        if (totalProducts === 0) {
          this.isOpenErrorMessage = true;
        }

        this.paginatorService.onProductsLoaded(
          this.totalProducts,
          this.productsPerPage
        );

        this.isLoading = false;
      });
  }

  ngAfterViewInit(): void {
    // fill the chips array with the chips gained from the url
    this.queryArr = this.getChipValuesFromUrlQueries();
    this.productsService.chipsListInitialize(this.queryArr);

    // update ActiveStatus arrays of all the filters so that the
    // selected item to be focused
    this.updateColorActiveStatus();
    this.updateSizeActiveStatus();
    this.updateHeelHeightActiveStatus();
    this.updateMaterialActiveStatus();
    this.updateSalesActiveStatus();

    // pass the query parameter description value to the header "Search for .."
    let urlTree = this.router.parseUrl(this.router.url);
    this.searchQuery = urlTree.queryParams['description'];

    // update the products on Products component
    this.productsService.onProductsUpdate(urlTree.queryParams);
    this.changeDetectorRef.detectChanges();
  }
  /**
   * Methods to update the panels, and specifically the items inside, if there is any
   * active to be highlighted.
   */
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
    const heelHeightIndex = this.productsService.getChipIndex('heel height');
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
  /************************************************************************/

  /**
   * Gets the current url and returns an array of the query parameters values
   * @returns an array of the query parameters values
   */
  getChipValuesFromUrlQueries() {
    let urlTree = this.router.parseUrl(this.router.url);
    let queryArr: Chip[] = [];
    Object.entries(urlTree.queryParams).forEach(([key, value], index) => {
      let chipObject: Chip = {
        key: `${decodeURI(key)}`,
        value: `${decodeURI(value)}`,
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
