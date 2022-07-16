import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatorService } from '../paginator/paginator.service';
import { Product } from './product/product.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  isLoading = false;
  productsSubscription: Subscription;
  initialProductsSubscription: Subscription;
  updateProductsSubscription: Subscription;
  sideBarWidthSubscription: Subscription;
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

  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)
    let windowWidth = window.innerWidth;
    this.pageWidth = windowWidth - this.sideBarWidth;
    if (this.productWidth) {
      let element = this.elementRef.nativeElement.querySelector('.wrapper');
      let marginRight = window
        .getComputedStyle(element)
        .getPropertyValue('margin-right');
      let marginLeft = window
        .getComputedStyle(element)
        .getPropertyValue('margin-left');
      let totalMargin = parseInt(marginLeft) + parseInt(marginRight);
      this.numOfCols = Math.floor(
        this.pageWidth / (this.productWidth + totalMargin)
      );
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
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // get the sideber width, so that it can be subtra
    this.sideBarWidthSubscription = this.productsService
      .getSideBarWidthListener()
      .subscribe((response) => {
        this.sideBarWidth = response;
      });

    this.productsService.getChangePageListener().subscribe((response) => {
      console.log(response);
      const { productsPerPage, currentPage } = response;
      this.productsService
        .getProducts(productsPerPage, currentPage)
        .subscribe((response) => {
          console.log(response);
          const { totalProducts, products, message } = response;
          this.products = products;
          this.updateRowsCols();
          this.cd.detectChanges();
          this.paginatorService.onProductsLoaded(
            totalProducts,
            productsPerPage
          );
        });
    });

    this.getProducts();

    this.initialProductsSubscription = this.productsService
      .getProductsUpdateListener()
      .subscribe((response) => {
        console.log(response);

        this.updateProductsSubscription = this.productsService
          .getProducts(this.productsPerPage, this.currentPage, response.query)
          .subscribe((response) => {
            console.log(response);
            const { totalProducts, products, message } = response;
            this.products = products;
            this.paginatorService.onProductsLoaded(
              totalProducts,
              this.productsPerPage
            );
            this.updateRowsCols();

            this.cd.detectChanges();
          });
      });
  }

  ngOnDestroy(): void {
    this.sideBarWidthSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.initialProductsSubscription.unsubscribe();
    this.updateProductsSubscription.unsubscribe();
  }

  getProducts() {
    this.isLoading = true;
    this.productsSubscription = this.productsService
      .getProducts(this.productsPerPage, this.currentPage)
      .subscribe((response) => {
        const { totalProducts, products, message } = response;
        this.products = products;
        this.paginatorService.onProductsLoaded(
          totalProducts,
          this.productsPerPage
        );

        this.isLoading = false;
        this.updateRowsCols();
      });
  }

  updateProductWidth(productWidth: number) {
    this.productWidth = productWidth;
    this.updateRowsCols();
    this.cd.detectChanges();
  }
}
