import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-click-drag-carousel',
  templateUrl: './click-drag-carousel.component.html',
  styleUrls: ['./click-drag-carousel.component.css'],
})
export class ClickDragCarouselComponent implements OnInit {
  @ViewChild('nav') ds;

  constructor() {}

  ngOnInit(): void {}

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index) {
    this.ds.moveTo(index);
  }
}
