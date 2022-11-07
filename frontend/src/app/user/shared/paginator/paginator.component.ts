import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../product/products.service';
import { PaginatorService } from './paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnChanges, OnDestroy {
  pageSizeOptions = environment.PAGE_SIZE_OPTIONS;
  currentPage = environment.CURRENT_PAGE;
  @Input() totalProducts = environment.TOTAL_PRODUCTS;
  @Input() productsPerPage = environment.PRODUCTS_PER_PAGE;
  productsLoadedSubscription: Subscription;

  constructor(
    private paginatorService: PaginatorService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsLoadedSubscription = this.paginatorService
      .getProductsLoadedListener()
      .subscribe((response) => {
        this.totalProducts = response.totalProducts;
        this.productsPerPage = response.productsPerPage;
      });
  }

  ngOnDestroy(): void {
    this.productsLoadedSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalProducts'])
      this.totalProducts = changes['totalProducts'].currentValue;
    if (changes['productsPerPage'])
      this.productsPerPage = changes['productsPerPage'].currentValue;
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productsService.onChangePage(this.productsPerPage, this.currentPage);
  }
}
