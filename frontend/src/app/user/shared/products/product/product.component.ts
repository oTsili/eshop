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
import { ProductsService } from '../products.service';
import { Product } from './product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements AfterViewInit {
  @Input() product: Product;
  @Input() source: string;
  @Output() elementInitialize: EventEmitter<number> =
    new EventEmitter<number>();

  @HostListener('window:resize', ['$event'])
  emitWidth() {
    this.elementInitialize.emit(this.elementRef.nativeElement.offsetWidth);
  }

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    /**
     * emit the product element's width to the parent element, so that it
     * can calculate the columns
     */
    this.elementInitialize.emit(
      this.elementRef.nativeElement.querySelector('.image').offsetWidth
    );
  }
}
