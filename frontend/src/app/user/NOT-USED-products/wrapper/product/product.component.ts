import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ResponsiveCatalogService } from 'src/app/user/shared/NOT-USED-responsive-catalog/responsive-catalog.service';
import { Product } from '../../products.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() source: string;
  constructor(
    private elementRef: ElementRef,
    private responsiveCatalogService: ResponsiveCatalogService
  ) {}

  ngOnInit(): void {
    let productWidth =
      this.elementRef.nativeElement.querySelector('.element').offsetWidth;
    this.responsiveCatalogService.productWidthUpdate(productWidth);
  }
}
