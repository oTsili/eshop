import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemClass } from './container/item/item';
import { ItemContent } from './container/item/item.directive';
import { ResponsiveCatalogService } from './responsive-catalog.service';

@Component({
  selector: 'app-responsive-catalog',
  templateUrl: './responsive-catalog.component.html',
  styleUrls: ['./responsive-catalog.component.scss'],
})
export class ResponsiveCatalogComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  isLoading = false;
  productsSubscription: Subscription;
  // @Input() items: any[];
  @Input() itemComponents: ItemClass[];
  @Input() customWidth: number;
  @Input() customMargin: number;
  numOfCols: number;
  arrOfCols: number[];
  arrOfRows: number[];
  productWidthSubscription: Subscription;
  isUpdated = false;

  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)

    let host = this.elementRef;
    let totalWidth = host.nativeElement.offsetWidth;
    let item = this.elementRef.nativeElement.querySelector('.wrapper');

    console.log(host);
    console.log({ customWidth: this.customWidth });
    console.log({ totalWidth });
    let marginRight;
    let marginLeft;
    if (this.isUpdated) {
      marginRight = window
        .getComputedStyle(item)
        .getPropertyValue('margin-right');
      marginLeft = window
        .getComputedStyle(item)
        .getPropertyValue('margin-left');
    }

    let totalMargin = this.customMargin;
    if (marginLeft && marginLeft) {
      totalMargin = parseInt(marginLeft) + parseInt(marginRight);
    }
    this.numOfCols = Math.floor(totalWidth / (this.customWidth + totalMargin));
    this.responsiveCatalogService.numOfCols = this.numOfCols;
    this.arrOfCols = Array(this.numOfCols).fill(1);

    this.arrOfRows = Array(
      Math.ceil(this.itemComponents.length / this.numOfCols)
    ).fill(1);
    console.log(this.arrOfCols.length, this.arrOfRows.length);
  }
  constructor(
    private elementRef: ElementRef,
    private responsiveCatalogService: ResponsiveCatalogService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productWidthSubscription = this.responsiveCatalogService
      .getProductWidthListener()
      .subscribe((response) => {
        this.customWidth = response;
        this.updateRowsCols();
        this.cd.markForCheck();
        this.isUpdated = true;
      });
  }

  ngOnDestroy(): void {
    this.productWidthSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.updateRowsCols();
    this.cd.detectChanges();
  }
}
