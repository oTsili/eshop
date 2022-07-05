import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CatalogService } from '../catalog.service';
import { Product } from './product.interface';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements AfterViewInit, OnInit {
  @Input() data;
  // @Input() index;
  products: Product[];
  product: Product;
  src: string;
  altSrc: string;
  itemIndex: number = 0;

  constructor(
    private elementRef: ElementRef,
    private catalogService: CatalogService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.onInit();
  }

  ngAfterViewInit(): void {
    this.updateProductWidth();
  }

  /**
   * Inform parent component about the cureent component initialization,
   * providing him with it width (offsetWidth) as well.
   */
  updateProductWidth() {
    let productWidth = this.elementRef.nativeElement.offsetWidth;
    this.catalogService.updateElementInitialize(productWidth);
  }
  /**
   * itemIndex is taken from the catalogService in which is stored
   * and updated by catalog temoplate and component
   */
  onInit() {
    this.products = this.data.products;

    this.itemIndex = this.catalogService.itemIndex;

    console.log(this.itemIndex);
    this.product = this.data.products[this.itemIndex];
    this.src = this.product.src;

    this.altSrc = this.product.altSrc;
  }

  // onInit() {
  //   this.products = this.data.products;
  //   if (this.productService.itemIndex < this.products.length) {
  //     this.itemIndex = this.productService.itemIndex;
  //     this.productService.itemIndex = this.itemIndex + 1;
  //   } else {
  //     this.itemIndex = 0;
  //     this.productService.itemIndex = this.itemIndex + 1;
  //   }

  //   this.product = this.data.products[this.itemIndex];

  //   console.log(this.product);
  //   console.log(this.itemIndex);
  //   this.src = this.product.src;
  //   this.altSrc = this.product.altSrc;
  // }
}
