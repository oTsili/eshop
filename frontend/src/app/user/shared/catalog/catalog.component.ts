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
import { CatalogService } from './catalog.service';
import { ItemClass } from './item/item';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  isLoading = false;
  productsSubscription: Subscription;
  products: Product[];
  numOfCols: number = 3;
  arrOfCols: number[];
  arrOfRows: number[];
  productWidth: number;
  items: ItemClass[] = [];

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
          (this.productWidth + totalMargin)
      );
    }
    this.arrOfCols = Array(this.numOfCols).fill(1);

    this.arrOfRows = Array(
      Math.ceil(this.products.length / this.numOfCols)
    ).fill(1);
  }

  constructor(
    private catalogService: CatalogService,
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  getProducts() {
    this.isLoading = true;
    this.productsSubscription = this.catalogService
      .getProducts()
      .subscribe((response) => {
        this.products = response.products;

        this.isLoading = false;

        this.updateRowsCols();

        this.items = this.catalogService.getItems(this.products);

        this.cd.detectChanges();
      });
  }

  updateProductWidth(productWidth: number) {
    this.productWidth = productWidth;
    this.updateRowsCols();
  }
}
