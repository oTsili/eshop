import { Component, OnInit } from '@angular/core';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  imageSrc: string;

  constructor(private carouselService: CarouselService) {}

  ngOnInit(): void {
    this.carouselService.getThumbnailListener().subscribe({
      next: (response) => (this.imageSrc = response),
    });
  }

  moveLeft() {}

  moveRight() {}
}
