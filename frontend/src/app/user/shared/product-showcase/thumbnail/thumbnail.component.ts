import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarouselService } from '../carousel/carousel.service';
import { ThumbnailService } from './thumbnail.service';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css'],
})
export class ThumbnailComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() thumbnails: string[];
  currentSlide = 0;
  base_url = environment.BASE_URL;

  constructor(
    private carouselService: CarouselService,
    private thumbnailService: ThumbnailService,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.thumbnailService.getArrowClickListener().subscribe((response) => {
      this.currentSlide =
        (this.currentSlide + response) % this.thumbnails.length;

      if (this.currentSlide < 0) {
        this.currentSlide = this.thumbnails.length + this.currentSlide;
      }
      this.preview(this.currentSlide);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['thumbnails']) {
      this.thumbnails = changes['thumbnails'].currentValue;

      for (let i = 0; i < this.thumbnails.length; i++) {
        this.thumbnails[i] =
          this.base_url.replace('/api', '') +
          this.thumbnails[i].replace('/static', '');
      }
    }
  }

  ngAfterViewInit(): void {
    // when the page loads show the first image
    // this.carouselService.onThumbnailUpdate(this.thumbnails[0]);
    const firstIconElement = this.elementRef.nativeElement.querySelector('a');
    firstIconElement.click();
    this.changeDetectorRef.detectChanges();
  }

  preview(index: number) {
    this.currentSlide = index;
    this.carouselService.onThumbnailUpdate(this.thumbnails[index]);
  }
}
