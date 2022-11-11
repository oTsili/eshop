import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Product } from 'src/app/user/product/product.interface';
import { environment } from 'src/environments/environment';
import { ThumbnailService } from '../thumbnail/thumbnail.service';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() product: Product;
  imageSrc: string;
  base_url = environment.BASE_URL;

  constructor(
    private carouselService: CarouselService,
    private thumbnailService: ThumbnailService
  ) {}

  ngOnInit(): void {
    this.carouselService.getThumbnailListener().subscribe({
      next: (response) => (this.imageSrc = response),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'].currentValue) {
      this.product = changes['product'].currentValue;
      this.imageSrc = `${this.base_url.replace(
        '/api',
        ''
      )}${this.product.src.replace('/static', '')}`;
    }
  }

  moveLeft() {
    this.thumbnailService.onArrowClick(-1);
  }

  moveRight() {
    this.thumbnailService.onArrowClick(+1);
  }
}
