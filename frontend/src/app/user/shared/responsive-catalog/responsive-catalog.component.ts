import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from './container/item/item';
import { ItemContent } from './container/item/item.directive';
import { ResponsiveCatalogDirective } from './responsive-catalog.directive';

@Component({
  selector: 'app-responsive-catalog',
  templateUrl: './responsive-catalog.component.html',
  styleUrls: ['./responsive-catalog.component.scss'],
})
export class ResponsiveCatalogComponent implements AfterContentInit {
  isLoading = false;
  productsSubscription: Subscription;
  @Input() items: any[];
  @Input() itemComponents: Item[];
  @Input() customWidth: number;
  numOfCols: number = 3;
  arrOfCols: number[];
  arrOfRows: number[];
  productWidth: number;

  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)

    if (this.productWidth) {
      console.log(this.productWidth);
      let item = this.elementRef.nativeElement.querySelector('.wrapper');
      let marginRight = window
        .getComputedStyle(item)
        .getPropertyValue('margin-right');
      let marginLeft = window
        .getComputedStyle(item)
        .getPropertyValue('margin-left');
      let totalMargin = parseInt(marginLeft) + parseInt(marginRight);
      this.numOfCols = Math.floor(
        parseInt(this.elementRef.nativeElement.offsetWidth) /
          (this.productWidth + totalMargin)
      );
    }
    console.log(this.numOfCols);
    this.arrOfCols = Array(this.numOfCols).fill(1);

    this.arrOfRows = Array(Math.ceil(this.items.length / this.numOfCols)).fill(
      1
    );

    console.log(this.arrOfCols.length, this.arrOfRows.length);
  }
  constructor(private elementRef: ElementRef) {}

  // ngOnInit(): void {
  // }

  ngAfterContentInit(): void {
    this.updateRowsCols();
  }

  updateItemWidth(productWidth) {
    console.log(productWidth);
    this.productWidth = productWidth;
    this.updateRowsCols();
  }
}
