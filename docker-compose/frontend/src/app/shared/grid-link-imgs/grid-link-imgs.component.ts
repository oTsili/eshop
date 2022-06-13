import { Component, OnInit } from '@angular/core';
import { ProductCategory } from './grid-link-imgs.interfaces';

@Component({
  selector: 'app-grid-link-imgs',
  templateUrl: './grid-link-imgs.component.html',
  styleUrls: ['./grid-link-imgs.component.css'],
})
export class GridLinkImgsComponent implements OnInit {
  categories: ProductCategory[] = [
    {
      id: '1',
      name: 'Winter',
      imageSrc: './assets/images/categories/1.webp',
    },
    {
      id: '2',
      name: 'Summer',
      imageSrc: './assets/images/categories/2.webp',
    },
    {
      id: '3',
      name: 'Kids',
      imageSrc: './assets/images/categories/3.webp',
    },
    {
      id: '4',
      name: 'New Collection',
      imageSrc: './assets/images/categories/4.webp',
    },
    {
      id: '5',
      name: 'Summer',
      imageSrc: './assets/images/categories/5.webp',
    },
    {
      id: '6',
      name: 'All Weather',
      imageSrc: './assets/images/categories/6.webp',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
