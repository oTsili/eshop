import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ProductCategory } from './grid-link-imgs.interfaces';

@Component({
  selector: 'app-grid-link-imgs',
  templateUrl: './grid-link-imgs.component.html',
  styleUrls: ['./grid-link-imgs.component.css'],
})
export class GridLinkImgsComponent implements OnInit {
  numberOfRows = 2;
  categories: ProductCategory[] = [
    {
      id: '0',
      name: 'Winter',
      imageSrc: './assets/images/categories/1.webp',
    },
    {
      id: '1',
      name: 'Summer',
      imageSrc: './assets/images/categories/2.webp',
    },
    {
      id: '2',
      name: 'Kids',
      imageSrc: './assets/images/categories/3.webp',
    },
    {
      id: '3',
      name: 'New Collection',
      imageSrc: './assets/images/categories/4.webp',
    },
  ];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  getCategoriesAreas(numOfCols: number) {
    return this.sharedService.getGridAreas(numOfCols, this.categories);
  }
}
