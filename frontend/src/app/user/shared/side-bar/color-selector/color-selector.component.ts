import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css'],
})
export class ColorSelectorComponent implements OnInit {
  /**
   * updates the number of colors, the array of Cols and
   * array of Rows, to be used in the grid of elements,
   * when window is resized.
   */
  @HostListener('window:resize', ['$event'])
  updateRowsCols() {
    // get the sidebar offset(px), convert to rem(*0.1), divide with
    // the box width plus the margin (3rem + .6rem + .6rem = 4.2rem)
    this.numberOfCols = Math.floor(
      (this.elementRef.nativeElement.offsetWidth * 0.1) / 4.2
    );
    this.arrOfCols = Array(this.numberOfCols)
      .fill(1)
      .map((x, i) => i + 1);

    this.arrOfRows = Array(Math.ceil(this.colorsArr.length / this.numberOfCols))
      .fill(1)
      .map((x, i) => i + 1);
  }

  colorsArr = [
    { color: 'red' },
    { color: 'blue' },
    { color: 'green' },
    { color: 'white' },
    { color: 'beige' },
    { color: 'brown' },
    { color: 'yellow' },
    { color: 'pink' },
    { color: 'mocha' },
    { color: 'purple' },
    { color: 'orange' },
  ];

  numberOfCols: number;
  arrOfCols: number[];
  arrOfRows: number[];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.updateRowsCols();
  }
}