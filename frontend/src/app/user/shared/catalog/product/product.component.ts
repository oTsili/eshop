import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from './product.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements AfterViewInit, OnInit {
  @Input() data;
  // @Input() product: Product;
  products: Product[];
  product: Product;
  // @Input() source: string;
  src: string;
  altSrc: string;
  itemIndex: number;

  @Output() elementInitialize: EventEmitter<number> =
    new EventEmitter<number>();

  @HostListener('window:resize', ['$event'])
  emitWidth() {
    this.elementInitialize.emit(this.elementRef.nativeElement.offsetWidth);
  }

  constructor(
    private elementRef: ElementRef,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getIndex();
    this.products = this.data.products;
    this.product = this.data.products[this.itemIndex];
    this.src = this.product.src;
    this.altSrc = this.product.altSrc;
  }

  ngAfterViewInit(): void {
    this.elementInitialize.emit(
      this.elementRef.nativeElement.querySelector('.element').offsetWidth
    );
  }

  getIndex() {
    this.itemIndex = this.productsService.itemIndex;
    this.productsService.itemIndex = this.itemIndex + 1;
  }
}
