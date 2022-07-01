import {
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../custom-drag-carousel/custom-drag-carousel.interfaces';
import { SharedService } from '../shared.service';
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
      console.log(this.elementRef.nativeElement.offsetWidth);
      console.log(this.productWidth);
      this.numOfCols = Math.ceil(
        parseInt(this.elementRef.nativeElement.offsetWidth) / this.productWidth
      );
    }
    this.arrOfCols = Array(this.numOfCols).fill(1);

    this.arrOfRows = Array(
      Math.ceil(this.products.length / this.numOfCols)
    ).fill(1);

    console.log(this.arrOfCols, this.arrOfRows);
  }

  constructor(
    private productsService: ProductsService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getProducts();
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
    // this.updateRowsCols();
  }
}
