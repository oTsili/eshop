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

  constructor(
    private gridLinksImgsService: GridLinksImgsService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.preloadImages();
  }

  ngOnDestroy(): void {
    this.gridLinkImgsSubscription.unsubscribe();
  }

  getCategoriesAreas(numOfCols: number) {
    return this.sharedService.getGridAreas(numOfCols, this.categories);
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
