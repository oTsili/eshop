import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { ResponsiveCatalogService } from '../../shared/NOT-USED-responsive-catalog/responsive-catalog.service';
import { Product } from '../products.interface';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
  @Input() data;
  itemIndex: number;
  products: Product[];
  productWidth: number;
  numOfCols: number;
  constructor(
    private responsiveCatalogService: ResponsiveCatalogService,
    private elementeRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.numOfCols = this.responsiveCatalogService.numOfCols || 1;

    this.itemIndex = parseInt(this.data.index);
    this.products = this.data.products;
  }
}
