import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CatalogService } from '../catalog.service';
import { ItemService } from '../item/item.service';
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
  // altSrc: string;
  itemIndex: number = 0;
  adHost;
  constructor(
    private elementRef: ElementRef,
    private catalogService: CatalogService,
    private itemService: ItemService // private cd: ChangeDetectorRef, // private productService: ProductService
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

    // this.cd.detectChanges();
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
    this.src = this.catalogService.imgSrc;

    // this.altSrc = this.catalogService.imgSrc;
  }

  clearComponents() {
    let comps = this.itemService.components;
    this.adHost = this.itemService.itemHost;
    console.log(this.adHost);
    console.log({ comps });
    const viewContainerRef = this.adHost.viewContainerRef;

    viewContainerRef.clear();
  }
}
