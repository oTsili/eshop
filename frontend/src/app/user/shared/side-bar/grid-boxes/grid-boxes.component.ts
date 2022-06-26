import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-boxes',
  templateUrl: './grid-boxes.component.html',
  styleUrls: ['./grid-boxes.component.css'],
})
export class GridBoxesComponent implements OnInit {
  elementsArr = [
    { text: '36' },
    { text: '37' },
    { text: '38' },
    { text: '39' },
    { text: '40' },
  ];

  numberOfCols = 3;
  arrOfCols = Array(this.numberOfCols)
    .fill(1)
    .map((x, i) => i + 1);

  arrOfRows = Array(Math.ceil(this.elementsArr.length / this.numberOfCols))
    .fill(1)
    .map((x, i) => i + 1);
  constructor() {}

  ngOnInit(): void {}
}
