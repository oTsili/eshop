import { Component, OnInit } from '@angular/core';
import { ThumbnailService } from '../thumbnail/thumbnail.service';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  imageSrc: string;

  constructor(
    private carouselService: CarouselService,
    private thumbnailService: ThumbnailService
  ) {}

  ngOnInit(): void {
    this.carouselService.getThumbnailListener().subscribe({
      next: (response) => (this.imageSrc = response),
    });
  }

  moveLeft() {
    this.thumbnailService.onArrowClick(-1);
  }

  moveRight() {
    this.thumbnailService.onArrowClick(+1);
  }
}
