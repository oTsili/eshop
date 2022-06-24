import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { ProductCategory } from './grid-link-imgs.interfaces';
import { GridLinksImgsService } from './grid-links.service';

@Component({
  selector: 'app-grid-link-imgs',
  templateUrl: './grid-link-imgs.component.html',
  styleUrls: ['./grid-link-imgs.component.css'],
})
export class GridLinkImgsComponent implements OnInit {
  numberOfRows = 2;
  isLoading = false;
  gridLinkImgsSubscription: Subscription;

  categories: ProductCategory[];
  // categories: ProductCategory[] = [
  //   {
  //     id: '0',
  //     name: 'Winter',
  //     imageSrc: './assets/images/categories/1.webp',
  //   },
  //   {
  //     id: '1',
  //     name: 'Summer',
  //     imageSrc: './assets/images/categories/2.webp',
  //   },
  //   {
  //     id: '2',
  //     name: 'Kids',
  //     imageSrc: './assets/images/categories/3.webp',
  //   },
  //   {
  //     id: '3',
  //     name: 'New Collection',
  //     imageSrc: './assets/images/categories/4.webp',
  //   },
  // ];

  constructor(private gridLinksImgsService: GridLinksImgsService) {}

  ngOnInit(): void {
    this.preloadImages();
  }

  ngOnDestroy(): void {
    this.gridLinkImgsSubscription.unsubscribe();
  }

  getCategoriesAreas(numOfCols: number) {
    return this.gridLinksImgsService.getGridAreas(numOfCols, this.categories);
  }

  preloadImages() {
    this.isLoading = true;

    this.gridLinkImgsSubscription = this.gridLinksImgsService
      .getGridCategories()
      .subscribe((response) => {
        // console.log(response);
        this.categories = response.gridCategories;
        this.isLoading = false;
      });
  }
}
