import {
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
  @Input() justify_content: string;
  @Input() margin: string;
  @ContentChildren(ParentElementDirective)
  items!: QueryList<ParentElementDirective>;

  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)
    this.pageWidth = this.elementRef.nativeElement.offsetWidth;

    if (this.elementWidth) {
      console.log(this.elementWidth);
      let rootElement =
        this.elementRef.nativeElement.querySelector('.elements');
      let marginRight = window
        .getComputedStyle(rootElement)
        .getPropertyValue('margin-right');
      let marginLeft = window
        .getComputedStyle(rootElement)
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

    if (this.elements) {
      this.arrOfRows = Array(
        Math.ceil(this.elements.length / this.numOfCols)
      ).fill(1);
    }
  }

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateRowsCols();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elements = changes['elements'].currentValue;
    this.updateRowsCols();
  }

  updateElementWidth(width: number, index: number) {
    if (index === 0) {
      this.elementWidth = width;

      if (this.elements) {
        this.updateRowsCols();
      }
    }
  }
}
