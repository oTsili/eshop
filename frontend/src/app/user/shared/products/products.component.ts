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
  internalProductsSubscription: Subscription;
  products: Product[];
  numOfCols: number = 3;
  arrOfCols: number[];
  arrOfRows: number[];
  productWidth: number;
  pageWidth: number;
  sideBarWidth: number;
  @ViewChild('productsElement') productsElement;

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
        this.pageWidth / (this.productWidth + parseInt(marginRight))
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
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // get the sideber width, so that it can be subtra
    this.productsService.getSideBarWidthListener().subscribe((response) => {
      this.sideBarWidth = response;
    });

    this.getProducts();

    this.initialProductsSubscription = this.productsService
      .getProductsUpdateListener()
      .subscribe((response) => {
        console.log(response);

        this.internalProductsSubscription = this.productsService
          .updateProductsList(response.query)
          .subscribe((response) => {
            console.log(response);
            this.products = response.products;
            this.cd.detectChanges();
          });
      });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.initialProductsSubscription.unsubscribe();
    this.internalProductsSubscription.unsubscribe();
  }

  getProducts() {
    this.isLoading = true;
    this.productsSubscription = this.productsService
      .getProducts()
      .subscribe((response) => {
        this.products = response.products;
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
