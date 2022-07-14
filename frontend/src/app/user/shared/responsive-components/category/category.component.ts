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
import { Category } from './category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements AfterViewInit, OnInit {
  @Input() category: Category;
  @Output() elementInitialize: EventEmitter<number> =
    new EventEmitter<number>();
  oldPrice: number;

  @HostListener('window:resize', ['$event'])
  emitWidth() {
    this.elementInitialize.emit(this.elementRef.nativeElement.offsetWidth);
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    /**
     * emit the product element's width to the parent element, so that it
     * can calculate the columns
     */

    let categoryWidth =
      this.elementRef.nativeElement.querySelector('.category').offsetWidth;

    this.elementInitialize.emit(categoryWidth);
  }
}
