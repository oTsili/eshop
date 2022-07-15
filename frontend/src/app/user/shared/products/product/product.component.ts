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

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements AfterViewInit, OnInit {
  @Input() img_height: string;
  @Input() product: Product;
  @Input() source: string;
  @Output() elementInitialize: EventEmitter<number> =
    new EventEmitter<number>();
  oldPrice: number;

  @HostListener('window:resize', ['$event'])
  emitWidth() {
    this.elementInitialize.emit(this.elementRef.nativeElement.offsetWidth);
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // compute the pre-sales(old) price from the sales percentage
    this.oldPrice =
      parseInt(this.product.price) +
      parseInt(this.product.price) * (parseInt(this.product.sales) / 100);
  }
  ngAfterViewInit(): void {
    /**
     * emit the product element's width to the parent element, so that it
     * can calculate the columns
     */
    let productWith =
      this.elementRef.nativeElement.querySelector('img').offsetWidth;
    this.elementInitialize.emit(productWith);
  }
}
