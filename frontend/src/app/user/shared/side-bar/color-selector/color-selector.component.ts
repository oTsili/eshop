import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css'],
})
export class ColorSelectorComponent implements OnInit {
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

  numberOfCols = 3;
  arrOfCols = Array(this.numberOfCols)
    .fill(1)
    .map((x, i) => i + 1);

  arrOfRows = Array(Math.ceil(this.colorsArr.length / this.numberOfCols))
    .fill(1)
    .map((x, i) => i + 1);
  constructor() {}

  ngOnInit(): void {}
}
