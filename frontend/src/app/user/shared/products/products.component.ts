import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
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
  products: Product[];
  numOfCols: number = 3;
  arrOfCols: number[];
  arrOfRows: number[];
  productWidth: number;

  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)

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
        parseInt(this.elementRef.nativeElement.offsetWidth) /
          (this.productWidth + parseInt(marginRight))
      );
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
    this.getProducts();

    this.productsService.getUpdateListener().subscribe((response) => {
      console.log(response);

      this.productsService.updateColor(response.query).subscribe((response) => {
        console.log(response);
        this.products = response.products;
      });
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
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
