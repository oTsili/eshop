import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-click-drag-carousel',
  templateUrl: './click-drag-carousel.component.html',
  styleUrls: ['./click-drag-carousel.component.css'],
})
export class ClickDragCarouselComponent implements OnInit {
  @ViewChild('nav') ds;
  products = [
    {
      src: './assets/images/1.jpeg',
      altSrc: '/assets/images/1-1.jpeg',
    },
    {
      src: './assets/images/2.jpeg',
      altSrc: '/assets/images/2-1.jpeg',
    },
    {
      src: './assets/images/3.jpeg',
      altSrc: '/assets/images/3-1.jpeg',
    },
    {
      src: './assets/images/4.jpeg',
      altSrc: '/assets/images/4-1.jpeg',
    },
    {
      src: './assets/images/5.jpeg',
      altSrc: '/assets/images/5-1.jpeg',
    },
    {
      src: './assets/images/6.jpeg',
      altSrc: '/assets/images/6-1.jpeg',
    },
  ];


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
