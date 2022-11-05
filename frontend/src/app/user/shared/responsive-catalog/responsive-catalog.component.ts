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
  totalMargin: number;
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
    // console.log({ pageWidth: this.pageWidth });

    if (this.elementWidth) {
      // console.log({ elementWidth: this.elementWidth });
      // console.log({ elementWidth: this.elementWidth + this.totalMargin });

      this.numOfCols = Math.floor(
        this.pageWidth / (this.elementWidth + this.totalMargin) - 1
      );
      // console.log(this.numOfCols);
      // compute the width of the container containing the products, so that
      // the paginator has the exactly same widht (and is put just below it)
      this.pageWidth = this.numOfCols * (this.elementWidth + this.totalMargin);
      this.changeDetectorRef.detectChanges();
    }

    this.arrOfCols = Array(this.numOfCols).fill(1);

    if (this.elements) {
      this.arrOfRows = Array(
        Math.ceil(this.elements.length / this.numOfCols)
      ).fill(1);
      this.changeDetectorRef.detectChanges();
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

  updateElementWidth(emittedObject) {
    // console.log(emittedObject);
    this.elementWidth = emittedObject.elementWidth;
    this.totalMargin = emittedObject.totalMargin;
    if (this.elements) {
      this.updateRowsCols();
    }
  }
}
