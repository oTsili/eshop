import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatorService } from '../paginator/paginator.service';
import { Product } from './product/product.interface';
import { ProductsService } from './products.service';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  isLoading = false;
  productsSubscription: Subscription;
  updateProductsSubscription: Subscription;
  sideBarWidthSubscription: Subscription;
  changePagePaginatorListener: Subscription;
  changeLanguageSubscription: Subscription;
  products: Product[];
  numOfCols: number = 3;
  arrOfCols: number[];
  arrOfRows: number[];
  productWidth: number;
  pageWidth: number;
  sideBarWidth: number;
  pageSizeOptions = environment.PAGE_SIZE_OPTIONS;
  currentPage = environment.CURRENT_PAGE;
  totalProducts = environment.TOTAL_PRODUCTS;
  productsPerPage = environment.PRODUCTS_PER_PAGE;
  isOpenErrorMessage = false;

  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)
    let windowWidth = window.innerWidth;
    this.pageWidth = windowWidth - this.sideBarWidth;
    if (this.productWidth) {
      let element = this.elementRef.nativeElement.querySelector('.products');
      let marginRight = window
        .getComputedStyle(element)
        .getPropertyValue('margin-right');
      let marginLeft = window
        .getComputedStyle(element)
        .getPropertyValue('margin-left');
      let totalMargin = parseInt(marginLeft) + parseInt(marginRight);
      this.numOfCols =
        Math.floor(this.pageWidth / (this.productWidth + totalMargin)) - 1;
      // compute the width of the container containing the products, so that
      // the paginator has the exactly same widht (and is put just below it)
      this.pageWidth = this.numOfCols * (this.productWidth + totalMargin);
      this.cd.detectChanges();
    }
    this.arrOfCols = Array(this.numOfCols).fill(1);

    this.arrOfRows = Array(
      Math.ceil(this.products.length / this.numOfCols)
    ).fill(1);
  }

  constructor(
    private productsService: ProductsService,
    private paginatorService: PaginatorService,
    private appService: AppService,
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    // get translate language and subscribe
    this.changeLanguageSubscription = this.appService
      .getLanguageChangeListener()
      .subscribe((response) => {
        this.translate.use(response);
      });

    // get the sideber width, so that it can be subtra
    this.sideBarWidthSubscription = this.productsService
      .getSideBarWidthListener()
      .subscribe((response) => {
        this.sideBarWidth = response;
      });

    // get the paginator change page listener
    this.changePagePaginatorListener = this.productsService
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
    this.sideBarWidthSubscription.unsubscribe();
    this.changePagePaginatorListener.unsubscribe();
    this.updateProductsSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
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
        this.updateRowsCols();
      });
  }

  /**
   * Called from the product component to inform about its width so that the
   * rows and columns are updated
   * @param productWidth
   */
  updateProductWidth(productWidth: number) {
    this.productWidth = productWidth;
    this.updateRowsCols();
    this.cd.detectChanges();
  }
}
