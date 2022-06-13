import { Component, OnInit, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-click-drag-carousel',
  templateUrl: './click-drag-carousel.component.html',
  styleUrls: [
    './click-drag-carousel.component.css',
    './click-drag-carousel.component.scss',
  ],
})
export class ClickDragCarouselComponent implements OnInit {
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  current_slide: number;
  products = [
    {
      src: './assets/images/1.jpeg',
      altSrc: '/assets/images/1-1.jpeg',
      name: 'Πέδιλο μπλε',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/2.jpeg',
      altSrc: '/assets/images/2-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/3.jpeg',
      altSrc: '/assets/images/3-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/4.jpeg',
      altSrc: '/assets/images/4-1.jpeg',
      name: 'Πέδιλο μπλε',
      price: '65,00',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/5.jpeg',
      altSrc: '/assets/images/5-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
    },
    {
      src: './assets/images/6.jpeg',
      altSrc: '/assets/images/6-1.jpeg',
      name: 'Πέδιλο μπλε',
      description: 'Δερμάτινη Τσάντα Ώμου με Tassels',
      price: '65,00',
      special_price: '35,00',
      sales: '25',
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

  clickNext() {
    let index = this.current_slide + 1;
    this.ds.moveTo(index);
  }

  clickPrevious() {
    let index = this.current_slide - 1;
    this.ds.moveTo(index);
  }
}
