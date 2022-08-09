import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { ParentElementDirective } from './directives/parent-element.directive';

@Component({
  selector: 'app-responsive-catalog',
  templateUrl: './responsive-catalog.component.html',
  styleUrls: ['./responsive-catalog.component.scss'],
})
export class ResponsiveCatalogComponent implements OnInit, OnChanges {
  pageWidth: number;
  sideBarWidth: number;
  numOfCols: number = 3;
  arrOfCols: number[];
  arrOfRows: number[];
  elementWidth: number;
  @Input() elements: any[];
  @ContentChildren(ParentElementDirective)
  items!: QueryList<ParentElementDirective>;

  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)
    // let windowWidth = window.innerWidth;
    this.pageWidth = this.elementRef.nativeElement.offsetWidth;

    if (this.elementWidth) {
      console.log(this.elementWidth);
      let elements = this.elementRef.nativeElement.querySelector('.elements');
      let marginRight = window
        .getComputedStyle(elements)
        .getPropertyValue('margin-right');
      let marginLeft = window
        .getComputedStyle(elements)
        .getPropertyValue('margin-left');
      let totalMargin = parseInt(marginLeft) + parseInt(marginRight);
      this.numOfCols =
        Math.floor(this.pageWidth / (this.elementWidth + totalMargin)) - 1;
      // compute the width of the container containing the products, so that
      // the paginator has the exactly same widht (and is put just below it)
      this.pageWidth = this.numOfCols * (this.elementWidth + totalMargin);
      this.changeDetectorRef.detectChanges();
    }
    this.arrOfCols = Array(this.numOfCols).fill(1);

    this.arrOfRows = Array(
      Math.ceil(this.elements.length / this.numOfCols)
    ).fill(1);
  }
  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateRowsCols();
    let element = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elements = changes['elements'].currentValue;
  }

  updateElementWidth(width: number, index: number) {
    if (index === 0) {
      console.log(width);
      this.elementWidth = width;
      this.updateRowsCols();
    }
  }
}
