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

  constructor() {}

  ngOnInit(): void {
    // this.getCategoriesAreas(2);
  }

  getCategoriesAreas(colNum: number) {
    let areas = '';
    for (let [index, category] of this.categories.entries()) {
      // console.log(category, index);
      if (index === 0) {
        areas = areas + `${index} `;
      } else if (index === this.categories.length - 1) {
        areas = areas + `${index}`;
      } else if (index % colNum !== 0) {
        areas = areas + `${index} |`;
      } else {
        areas = areas + ` ${index} `;
      }
    }

    console.log(areas);
    return areas;
  }
}
