import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../custom-drag-carousel.interfaces';

@Component({
  selector: 'app-drag-slide',
  templateUrl: './drag-slide.component.html',
  styleUrls: ['./drag-slide.component.scss'],
})
export class DragSlideComponent implements OnInit {
  @Input() product: Product;
  @Input() source: string;
  constructor() {}

  ngOnInit(): void {}
}
