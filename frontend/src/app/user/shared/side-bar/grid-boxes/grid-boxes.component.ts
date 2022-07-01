import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-grid-boxes',
  templateUrl: './grid-boxes.component.html',
  styleUrls: ['./grid-boxes.component.css'],
})
export class GridBoxesComponent implements OnInit {
  numberOfCols: number;
  arrOfCols: number[];
  arrOfRows: number[];

  constructor(private elementRef: ElementRef) {}

  /**
   * updates the number of colors, the array of Cols and
   * array of Rows, to be used in the grid of elements,
   * when window is resized
   */
  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)
    this.numberOfCols = Math.floor(
      (this.elementRef.nativeElement.offsetWidth * 0.1) / 4.2
    );
    this.arrOfCols = Array(this.numberOfCols).fill(1);
    // .map((x, i) => i + 1);

    this.arrOfRows = Array(
      Math.ceil(this.elementsArr.length / this.numberOfCols)
    ).fill(1);
    // .map((x, i) => i + 1);
  }

  elementsArr = [
    { text: '36' },
    { text: '37' },
    { text: '38' },
    { text: '39' },
    { text: '40' },
  ];

  ngOnInit(): void {
    this.updateRowsCols();
  }
}
