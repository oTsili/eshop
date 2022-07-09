import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './product/product.interface';
import { CatalogService } from './catalog.service';
import { ItemClass } from './item/item';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  isLoading = false;
  productsSubscription: Subscription;
  productWidthSubscription: Subscription;
  products: Product[];
  numOfCols: number = 1;
  arrOfCols: number[];
  arrOfRows: number[];
  productWidth: number;
  items: ItemClass[] = [];
  itemIndex: number = 0;
  someSubscription: Subscription;
  /**
   * calculate the number of columns and rows for the catalog.
   * reads the
   */
  updateRowsCols() {
    let totalWidth: number;
    if (this.productWidth) {
      let element = this.elementRef.nativeElement.querySelector('.wrapper');
      let marginRight = window
        .getComputedStyle(element)
        .getPropertyValue('margin-right');
      let marginLeft = window
        .getComputedStyle(element)
        .getPropertyValue('margin-left');
      let totalMargin = parseInt(marginLeft) + parseInt(marginRight);
      totalWidth = this.elementRef.nativeElement.offsetWidth + totalMargin;
      this.numOfCols = Math.floor(totalWidth / this.productWidth);
      // console.log(
      //   { totalWidth },
      //   { totalMargin },
      //   { productWidth: this.productWidth }
      // );
    }
    this.arrOfCols = Array(this.numOfCols).fill(1);

    this.arrOfRows = Array(
      Math.ceil(this.products.length / this.numOfCols)
    ).fill(1);

    // console.log({
    //   arCol: this.arrOfCols.length,
    //   arrRow: this.arrOfRows.length,
    //   cols: this.numOfCols,
    // });
  }

  constructor(
    private catalogService: CatalogService,
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();

    this.productWidthSubscription = this.catalogService
      .getElementInitializeListener()
      .subscribe((response) => {
        this.productWidth = response;
        this.updateRowsCols();
      });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.productWidthSubscription.unsubscribe();
  }

  getProducts() {
    this.isLoading = true;
    this.productsSubscription = this.catalogService
      .getProducts()
      .subscribe((response) => {
        this.products = response.products;

        this.isLoading = false;

        this.items = this.catalogService.getComponents(this.products);

        this.updateRowsCols();

        this.cd.detectChanges();
      });
  }

  updateIndex(event) {
    console.log(event);
    this.catalogService.itemIndex = event;
  }

  updateImgSrc(event) {
    console.log(event);
    this.catalogService.imgSrc = event;
  }
}
