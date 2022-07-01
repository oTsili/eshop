import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-responsive-catalog',
  templateUrl: './responsive-catalog.component.html',
  styleUrls: ['./responsive-catalog.component.scss'],
})
export class ResponsiveCatalogComponent implements OnInit {
  isLoading = false;
  productsSubscription: Subscription;
  @Input() items: any[];
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
  }
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.updateRowsCols();
  }

  updateItemWidth(productWidth) {
    console.log(productWidth);
    this.productWidth = productWidth;
    this.updateRowsCols();
  }
}
