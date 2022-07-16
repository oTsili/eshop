import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../products/products.service';
import { PaginatorService } from './paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  pageSizeOptions = environment.PAGE_SIZE_OPTIONS;
  currentPage = environment.CURRENT_PAGE;
  totalProducts = environment.TOTAL_PRODUCTS;
  productsPerPage = environment.PRODUCTS_PER_PAGE;

  constructor(
    private productsService: ProductsService,
    private paginatorService: PaginatorService
  ) {}

  ngOnInit(): void {
    this.paginatorService.getProductsLoadedListener().subscribe((response) => {
      console.log(response);
      this.totalProducts = response.totalProducts;
      this.productsPerPage = response.productsPerPage;
    });
  }

  onChangePage(pageData: PageEvent) {
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productsService.onChangePage(this.productsPerPage, this.currentPage);
  }
}
